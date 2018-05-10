import { Component, ViewChild, ElementRef, Injectable } from '@angular/core';
import { NavController, MenuController, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
// import { MapsProvider } from './../../providers/maps/maps';
import { SelectSearchable } from 'ionic-select-searchable';
// import { GoogleMap } from '@ionic-native/google-maps';
import { ActionSheetController } from 'ionic-angular';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RoutePage } from '../route/route';

import {Observable} from 'rxjs/Rx';
import { AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { TripInfoPage } from '../trip-info/trip-info';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  location: {
    latitude: number,
    longitude: number
  };

  //default option
  option : string = 'address';
  destinationPlace : string;
  showing : boolean = false;

  originPlace : any;
  selectedRoute : any;
  map: any;
  defaultItems : string[] = ['417 South Craig Street', 'Heinz College', 'Hilman & Gates Center'];
  items : any;

  setUpComplete : boolean;
  searchOrigin : boolean;

  onRoute : boolean = false;

  

  @ViewChild('map') mapElement: ElementRef;
  
  constructor(public navCtrl: NavController, 
              public geolocation: Geolocation, 
              public httpClient : HttpClient,
              public actionSheetCtrl: ActionSheetController,
              public menuController: MenuController,
              public alertCtrl: AlertController,
              public dataProvider : DataProvider,
              public modalCtrl: ModalController) {
      menuController.enable(true);
    
  }

  ionViewDidLoad() {
    this.init();
  }

  showResultsOrigin(event : any) {

    this.searchOrigin = true;

    console.log(event)

    console.log("here: " + event.target.value);
    let val : string = event.target.value;

    if (val && val.trim() != '') {
      this.queryAutocomplete(val);
    }
  }

  showResultsDestination(event : any) {
    
    this.searchOrigin = false;
    
    console.log(event)

    console.log("here: " + event.target.value);
    let val : string = event.target.value;

    if (val && val.trim() != '') {
      this.queryAutocomplete(val);
    }
  }

  
  api : string = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
  API_KEY : string = "AIzaSyCBeB1HmMwK2Bp3Nx3s_GnBmzRuCYVSuuk";
  
  queryAutocomplete(query : string) {
    // let headers = new HttpHeaders().set('Access-Control-Allow-Origin' , 'http://localhost:8100').set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    let params : HttpParams = new HttpParams().set("key", this.API_KEY)
                  .set("input", query)
                  .set("location", this.location.latitude + ','+this.location.longitude);

    console.log(params);
    this.httpClient.get(this.api, {params : params}).subscribe(data => {
      console.log(data);
      this.items = data['predictions'];
      this.showing = true;
    });
  }

  target_location : any;

  origin_marker : any;
  destination_marker : any;
  target_marker : any;

  origin_icon = {
    url : "http://maps.google.com/mapfiles/kml/paddle/O.png",
    size : new google.maps.Size({height : 10, width : 10})
  }
  destination_icon = {
    url : "http://maps.google.com/mapfiles/kml/paddle/D.png",
    size : new google.maps.Size({height : 1, width : 1})
  }

  place_api = 'https://maps.googleapis.com/maps/api/place/details/json'
  selectPlace(place_id : string) {
    let params : HttpParams = new HttpParams()
                .set("key", this.API_KEY)
                .set("placeid", place_id);

      this.httpClient.get(this.place_api, {params : params}).subscribe( data => {
        console.log(data);
        this.target_location = data['result']['geometry']['location'];
        
        if (this.searchOrigin) {
          this.origin_marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.target_location['lat'], this.target_location['lng']),
            map: this.map,
            icon : "http://maps.google.com/mapfiles/kml/paddle/O.png"
          });
        } else {
          this.destination_marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.target_location['lat'], this.target_location['lng']),
            map: this.map,
            icon : "http://maps.google.com/mapfiles/kml/paddle/D.png"
          });
        }
    }
    );
  }

  direction_api = 'https://maps.googleapis.com/maps/api/directions/json'
  getRoute(start_from_here : boolean, origin_location : any, place_id : string) {

    let origin_param : string;

    if (start_from_here) {
      origin_param = origin_location.latitude + ','+origin_location.longitude;
    } else {
      origin_param = "place_id:" + origin_location['place_id'];
    }

    let params : HttpParams = new HttpParams()
                .set("key", this.API_KEY)
                .set("destination", "place_id:" + place_id)
                .set("mode", "transit")
                .set('alternatives',"true")
                .set("origin", origin_param);

      console.log(start_from_here);

      console.log(origin_location)
      
      this.httpClient.get(this.direction_api, {params : params}).subscribe( data => {
        // console.log(data);
        // console.log(JSON.stringify(data, null, 2));
        console.log(data);

        let routes = data['routes'];
        console.log(routes);
        
        this.goToRoutePage(routes);
      }
    );
  }

  polyline : any;

  callBackFunction = (_params) => {
    return new Promise((resolve, reject) => {

        this.onRoute = true;
        this.selectedRoute = _params['route'];
        console.log(this.selectedRoute);
        console.log(this.selectedRoute['overview_polyline']['points']);
        console.log(google.maps.geometry.encoding.decodePath(this.selectedRoute['overview_polyline']['points']));
        this.polyline = new google.maps.Polyline({
          path: google.maps.geometry.encoding.decodePath(this.selectedRoute['overview_polyline']['points']),
          map: this.map
        }); 
        
        let leg : any = this.selectedRoute['legs'][0];
        let paac_rt : any;
        let departure_stop : any;
        let arrival_stop : any;
        let direction : string;
        for (let step of leg['steps']) {
          if (step['travel_mode'] == 'TRANSIT') {
            paac_rt = step['transit_details']['line']['short_name'];
            departure_stop = step['transit_details']['departure_stop']['name'].toUpperCase();
            arrival_stop = step['transit_details']['arrival_stop']['name'].toUpperCase();
            direction = step['transit_details']['headsign'];
            let index : number = direction.indexOf('-');
            direction = direction.substr(0, index).toUpperCase();
          }
        }

        console.log(paac_rt);
        console.log(departure_stop);
        console.log(arrival_stop);
        console.log(direction);
        this.getStop(paac_rt, departure_stop, arrival_stop, direction);
    });
   }

  stops_api = 'http://realtime.portauthority.org/bustime/api/v3/getstops';
  prediction_api = 'http://realtime.portauthority.org/bustime/api/v3/getpredictions';
  vehicle_api = 'http://realtime.portauthority.org/bustime/api/v3/getvehicles';
  bus_api_key = 'WTqzZyDtJGUfQC4UZVFztNcNz';
  
  car_location_observe
   : any;
  car_marker  = new google.maps.Marker({
    map : this.map,
    icon : 'http://maps.google.com/mapfiles/ms/micons/bus.png'
  });
  

  car_location : any;
  getStop(rt : string, departure_stop : string, arrival_stop : string, dir : string){
    let params : HttpParams = new HttpParams()
    .set("key", this.bus_api_key)
    .set("format", 'json')
    .set("rt", rt)
    .set("rtpidatafeed", "Port Authority Bus")
    .set("dir", dir);

    departure_stop = departure_stop.replace("OPPOSITE", "OPP");
    arrival_stop = arrival_stop.replace("OPPOSITE", "OPP");

    let d_stop_id = this.dataProvider.getStopId(departure_stop);
    let a_stop_id = this.dataProvider.getStopId(arrival_stop);

    if (d_stop_id == null || a_stop_id == null) {
      
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Stop Not Found',
        buttons: ['OK']
      });
      alert.present();
      return;
    }
      
      let prediction_params = new HttpParams()
        .set('stpid', d_stop_id)
        .set('rt',rt)
        .set('key', this.bus_api_key)
        .set('format', 'json')
        .set('rtpidatafeed', 'Port Authority Bus');

      this.httpClient.get(this.prediction_api, {params : prediction_params}).subscribe( data => {
        console.log(data['bustime-response']);
        let vid = data['bustime-response']['prd'][0]['vid'];

        let vehicle_params = new HttpParams()
        .set('key', this.bus_api_key)
        .set('format', 'json')
        .set('rtpidatafeed', 'Port Authority Bus')
        .set('vid', vid);
        
        this.car_location_observe
         = Observable.interval(4000).switchMap(() => 
          this.httpClient.get(this.vehicle_api, {params : vehicle_params}).map((data) => data['bustime-response']['vehicle'][0])
        ).subscribe(data => {
          this.car_marker.setMap(this.map);
          this.car_location = new google.maps.LatLng(+data['lat'], +data['lon']);
          this.car_marker.setPosition(this.car_location);
        })
      });
  }

  goToRoutePage(routes : any) {
    this.navCtrl.push(RoutePage, {callback : this.callBackFunction, routes : routes});
  }

  clearResult(){
    this.items = [];
    this.showing = false;
  }

  cancel(event: any) {
    console.log("here: " + event.target.value);
    this.items = [];
  }

  origin_location : any;
  destincation_location : any;
  selectResult(event : any, result : any) {

    console.log(event);
    console.log(result);

    if (this.searchOrigin != null && this.searchOrigin == true) {
      this.originPlace = result['description'];
      this.origin_location = {
        place_id : result['place_id']
      }
    } else {
      this.destinationPlace = result['description'];
      this.destincation_location = result;
    }
    console.log(result);
    this.clearResult();
    this.selectPlace(result['place_id']);
  }

  search(event : any) {

    if (this.destinationPlace) {

      let start_from_here : boolean;
    
      if (this.originPlace == null || this.originPlace == '') {
        this.origin_location = this.location;
        start_from_here = true;
      } else {
        start_from_here = false;
      }

      console.log(start_from_here)
      let actionSheet = this.actionSheetCtrl.create({
      title: this.destincation_location['description'],
      buttons: [
        {
          text: 'Add to Bookmark',
          handler: () => {
            this.dataProvider.addFavorite(this.destincation_location['description']);
            let alert = this.alertCtrl.create({
              title: 'Success',
              subTitle: this.destincation_location['description'] + ' Added to Favorites',
              buttons: ['OK']
            });
            alert.present();
          }
        },{
          text: 'Get Directions',
          handler: () => {
            this.getRoute(start_from_here, this.origin_location, this.destincation_location['place_id']);
            console.log('route got');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();

  } else {

    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Please enter you destination',
      buttons: ['OK']
    });
    alert.present();
  }
}

marker : any;

  init(){

    //map opts
    let map_opts = {
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, map_opts);

    this.marker = new google.maps.Marker({
      icon : "http://maps.google.com/mapfiles/ms/micons/man.png"
    });


    let options = {
      enableHighAccuracy: true,
      timeout: 25000
    };

    this.geolocation.watchPosition(options).subscribe(position => {

      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      let latLng = new google.maps.LatLng(this.location.latitude, this.location.longitude);

      this.marker.setMap(this.map);
      this.marker.setPosition(latLng);
      this.map.setCenter(latLng);
      console.log("marker added");

    })
  }


  tripInfo(event : any ) {
    var data = this.selectedRoute;
    var tripInfoPage = this.modalCtrl.create(TripInfoPage, data);
    tripInfoPage.present();
  }

  locateBus(event : any ) {
    this.map.setCenter(this.car_location);
  }

  exitTrip(event : any ) {
    this.onRoute = false;
    this.origin_marker.setMap(null);
    this.destination_marker.setMap(null);
    this.originPlace = null;
    this.origin_location = null;
    this.destinationPlace = null;
    this.polyline.setMap(null);
    this.car_marker.setMap(null);
    this.car_location_observe.unsubscribe();
    this.car_location = null;
  }
}