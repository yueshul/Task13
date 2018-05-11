import { Component,ViewChild } from '@angular/core';
import { Platform, ModalController,Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';


import { BusAlarmPage } from '../pages/bus-alarm/bus-alarm';
import { AlertTypePage } from '../pages/alert-type/alert-type';
import { FavoritePage } from '../pages/favorite/favorite';
import { DataProvider } from '../providers/data/data';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage:any = HomePage;
  homeSetUp : boolean;
  workSetUp : boolean;
  homeAddr : string;
  workAddr : string;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public modalCtrl: ModalController,
    public alertCtrl: AlertController,public dataProvider : DataProvider) {

      this.homeSetUp = dataProvider.homeSetUp;
      this.workSetUp = dataProvider.workSetUp;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToFavorite(params){
    if (!params) params = {};
    this.navCtrl.push(FavoritePage);
  }
  

  goToBusAlarm(params){
    if (!params) params = {};
    this.navCtrl.push(BusAlarmPage);
  }
  
  goToAlertType(params){
    if (!params) params = {};
    this.navCtrl.push(AlertTypePage);
  }

  showHomePrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Set Your Home Address',
      inputs: [
        {
          name: 'Address',
          placeholder: 'Address'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {

            console.log(data);
            this.dataProvider.homeAddr = data['Address'];
            this.homeAddr = this.dataProvider.homeAddr;
            this.dataProvider.homeSetUp = true;
            this.homeSetUp = true;
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  showWorkPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Set Your Work Address',
      inputs: [
        {
          name: 'Address',
          placeholder: 'Address'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {

            
            this.dataProvider.workAddr = data['Address'];
            this.workAddr = this.dataProvider.workAddr;
            this.dataProvider.workSetUp = true;
            this.workSetUp = true;
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }


}

