import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TripInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip-info',
  // templateUrl: 'trip-info.html',
  template: `
  <ion-header>

  <ion-navbar>
    <ion-title>Trip Infomation</ion-title>
    <ion-buttons end>
        <button ion-button (click)="closeModal()">Close</button>
        </ion-buttons>
  </ion-navbar>

</ion-header>


<ion-content padding>

<ion-card *ngFor="let tripInfo of array">
  <ion-card-header text-wrap="white-space: normal">
  <ion-icon name="information-circle"></ion-icon>
   Trip ({{tripInfo.start_addr}} - {{tripInfo.end_addr}})
  </ion-card-header>
  <ion-card-content ng-model="tripInfo">
    
    <p>Please departure at {{tripInfo.dep}} and you will arrive at {{tripInfo.arr}}</p>
    <p>Bus will departure at {{tripInfo.dep_stop_time}} and arrive at {{tripInfo.arr_stop_time}}</p>
    <p>Estimated Duration: {{tripInfo.dur}}</p>
    <p>Distance: {{tripInfo.dis}}</p>
  </ion-card-content>
  </ion-card>
    <ion-card>
        <ion-card-header>
        <ion-icon name="bus"></ion-icon>
         Bus Location
        </ion-card-header>
        <ion-card-content>
          <p>Real time estimation arrival time at departure stop: {{tripInfo.dep_stop_time}}</p>
        </ion-card-content>
      </ion-card>
      <ion-card>
  <ion-card-header>
  <ion-icon name="locate"></ion-icon>
   Directions
  </ion-card-header>
  <ion-card-content>
    <ion-list>

      <p ion-item *ngFor="let step of tripInfo.transitsteps" text-wrap="white-space: normal">{{step}}</p>
    </ion-list>
  </ion-card-content>
  </ion-card>

</ion-content>
`
})
export class TripInfoPage {

  array : any;

  tripInfo : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tripInfo = navParams.data;
    this.array = new Array(this.tripInfo);
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripInfoPage');
    this.tripInfo = this.navParams.data;
    console.log("=====")
    console.log(this.tripInfo)
  }

  closeModal() {
    this.navCtrl.pop();
  }

}
