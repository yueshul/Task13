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

<ion-card>
  <ion-card-header>
  <ion-icon name="information-circle"></ion-icon>
   Trip
  </ion-card-header>
  <ion-card-content>
    <p>From: 417 South Craig Street</p>
    <p>To: 5326 Pocusset Street</p>
    <p>Arrive at depature stop at: 11:40 am</p>
    <p>Estimated time at arrival stop: 11:56 am</p>
  </ion-card-content>
  </ion-card>
    <ion-card>
        <ion-card-header>
        <ion-icon name="bus"></ion-icon>
         Bus Location
        </ion-card-header>
        <ion-card-content>
          <p>Next stop: </p>
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

  tripInfo : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tripInfo = navParams.data;


    console.log("=====")
    console.log(this.tripInfo)
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
