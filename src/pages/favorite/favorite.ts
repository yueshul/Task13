import { Component,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage, NavParams } from 'ionic-angular';
import { Platform, ModalController,Nav } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MyApp } from '../../app/app.component';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { MapsProvider } from './../../providers/maps/maps';
import { SelectSearchable } from 'ionic-select-searchable';
import { MenuController } from 'ionic-angular';
// import { GoogleMap } from '@ionic-native/google-maps';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'favorite.html'
  // selector: 'page-favorite',
  
})

export class FavoritePage {
  // @ViewChild(Nav) navCtrl: Nav;
  // rootPage:any = HomePage;

  // location: {
  //   latitude: number,
  //   longitude: number
  // };
  option : string = 'address';
  search_result: string;
  showing : boolean = false;
  showing_result : boolean = false;

  selectedRoute : any;
  map: any;
  defaultItems : string[] = ['417 South Craig Street', 'Heinz College', 'Hilman & Gates Center'];
  items : any;

  constructor(public navCtrl: NavController, 
    public geolocation: Geolocation, 
    public mapsProvider: MapsProvider, 
    public httpClient : HttpClient,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public menuController: MenuController) {
menuController.enable(true);
}


  goback() {
    this.navCtrl.pop();
    // this.navCtrl.setRoot(HomePage);
}

showResults(event : any) {
  console.log("favorite");

  let val : string = event.target.value;
  this.showing_result = true;
  if (val && val.trim() != '') {
    this.queryAutocomplete(val);
  }
}


api : string = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
API_KEY : string = "AIzaSyCBeB1HmMwK2Bp3Nx3s_GnBmzRuCYVSuuk";

queryAutocomplete(query : string) {
  // let headers = new HttpHeaders().set('Access-Control-Allow-Origin' , 'http://localhost:8100').set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  let params : HttpParams = new HttpParams().set("key", this.API_KEY)
                .set("input", query);
                // .set("location", this.location.latitude + ','+this.location.longitude);

  console.log(params);
  this.httpClient.get(this.api, {params : params}).subscribe(data => {
    console.log(data);
    this.items = data['predictions'];
    this.showing = true;
  });
}

clearResult(){
  this.items = [];
  this.showing = false;
}

cancel(event: any) {
  console.log("here: " + event.target.value);
  this.items = [];
}

// search_result : any;
// destincation_location : any;
// const control =
search_results : string[] = [];

addtoFav(event : any, result : any) {

  console.log(event);
  console.log('the fav search result');
  console.log(event['description']);
  let alert = this.alertCtrl.create({
    title: 'Success',
    subTitle: event['description'] + ' Added to Favorites',
    buttons: ['OK']
  });
  alert.present();
  this.search_results.push(event['description']);
  this.search_result = "";
  this.showing_result = false;
  
  console.log('search_results');
  console.log(this.search_results);
}


  // if (this.searchOrigin != null && this.searchOrigin == true) {
  //   this.originPlace = result['description'];
  //   this.origin_location = {
  //     place_id : result['place_id']
  //   }
  // } else {
  //   this.destinationPlace = result['description'];
  //   this.destincation_location = result;
  // }
  // console.log(result);
  // this.clearResult();
  // this.selectPlace(result['place_id']);

}
