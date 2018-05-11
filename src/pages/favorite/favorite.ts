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
import { DataProvider } from '../../providers/data/data';

@Component({
  templateUrl: 'favorite.html'
  // selector: 'page-favorite',
  
})

export class FavoritePage {

  option : string = 'address';
  search_result: string;
  showing : boolean = false;
  showing_result : boolean = false;

  searchItem : any;
  selectedRoute : any;
  map: any;
  defaultItems : string[] = ['417 South Craig Street', 'Heinz College', 'Hilman & Gates Center'];
  items : any;

  favorites : any;

  constructor(public navCtrl: NavController, 
    public geolocation: Geolocation, 
    public httpClient : HttpClient,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public dataProvider : DataProvider) {

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

  this.dataProvider.addFavorite(event['description']);
  this.favorites = this.dataProvider.favorites;
  this.search_result = "";
  this.showing_result = false;
  this.searchItem = "";
  console.log('search_results');
  
}


}
