import { Component,ViewChild } from '@angular/core';
import { Platform, ModalController,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';


import { BusAlarmPage } from '../pages/bus-alarm/bus-alarm';
import { AlertTypePage } from '../pages/alert-type/alert-type';
import { FavoritePage } from '../pages/favorite/favorite';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public modalCtrl: ModalController) {
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
}

