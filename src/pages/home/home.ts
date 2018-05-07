import { Component, ViewChild, ElementRef, Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MapsProvider } from './../../providers/maps/maps';
import { SelectSearchable } from 'ionic-select-searchable';
// import { GoogleMap } from '@ionic-native/google-maps';
import { ActionSheetController } from 'ionic-angular';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RoutePage } from '../route/route';

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
  searchItem : string;
  showing : boolean = false;

  selectedRoute : any;
  map: any;
  defaultItems : string[] = ['417 South Craig Street', 'Heinz College', 'Hilman & Gates Center'];
  items : any;

  @ViewChild('map') mapElement: ElementRef;
  
  constructor(public navCtrl: NavController, 
              public geolocation: Geolocation, 
              public mapsProvider: MapsProvider, 
              public httpClient : HttpClient,
              public actionSheetCtrl: ActionSheetController) {
      
  }

  ionViewDidLoad() {
    this.findUserLocation();

    console.log(google.maps.geometry);
  }

  findUserLocation(){
    let options = {
      enableHighAccuracy: true,
      timeout: 25000
    };
    this.geolocation.getCurrentPosition(options).then((position) => {
      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      this.init(this.location, this.mapElement);
      // this.mapsProvider.init(this.location, this.mapElement);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  showResults(event : any) {
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
  target_marker : any;
  place_api = 'https://maps.googleapis.com/maps/api/place/details/json'
  selectPlace(place_id : string) {
    let params : HttpParams = new HttpParams()
                .set("key", this.API_KEY)
                .set("placeid", place_id);

      this.httpClient.get(this.place_api, {params : params}).subscribe( data => {
        console.log(data);
        this.target_location = data['result']['geometry']['location'];
        
        this.target_marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.target_location['lat'], this.target_location['lng']),
          map: this.map
      });
    }
    );
  }

  direction_api = 'https://maps.googleapis.com/maps/api/directions/json'
  getRoute(place_id : string) {

    let params : HttpParams = new HttpParams()
                .set("key", this.API_KEY)
                .set("origin", this.location.latitude + ','+this.location.longitude)
                .set("destination", "place_id:" + place_id)
                .set("mode", "transit");

      this.httpClient.get(this.direction_api, {params : params}).subscribe( data => {
        // console.log(data);
        // console.log(JSON.stringify(data, null, 2));

        let routes = data['routes'];
        console.log(routes);
        this.goToRoutePage(routes);
      }
    );
  }

  callBackFunction = (_params) => {
    return new Promise((resolve, reject) => {
        this.selectedRoute = _params;
        console.log(this.selectedRoute);
        console.log(this.selectedRoute['overview_polyline']['points']);
        console.log(google.maps.geometry.encoding.decodePath(this.selectedRoute['overview_polyline']['points']));
        var polyline = new google.maps.Polyline({
          path: google.maps.geometry.encoding.decodePath(this.selectedRoute['overview_polyline']['points']),
          map: this.map
        }); 
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

  selectResult(result : any) {
    console.log(result);
    this.searchItem = result['description'];
    console.log(result);
    this.clearResult();
    this.selectPlace(result['place_id']);

    let actionSheet = this.actionSheetCtrl.create({
      title: result['description'],
      buttons: [
        {
          text: 'Add to Bookmark',
          handler: () => {
            console.log('bookmark clicked');
          }
        },{
          text: 'Get Directions',
          handler: () => {
            this.getRoute(result['place_id']);
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
  }

  init(location, element){
    let latLng = new google.maps.LatLng(location.latitude, location.longitude);

    let opts = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(element.nativeElement, opts);

    console.log("to add marker");
    let marker = new google.maps.Marker({
      position: latLng,
      map: this.map
    });
    console.log("marker added");
  }


}