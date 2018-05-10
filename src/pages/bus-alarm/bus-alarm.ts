import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-bus-alarm',
  templateUrl: 'bus-alarm.html'
})
export class BusAlarmPage {

  constructor(public navCtrl: NavController) {
  }

  goback() {
    this.navCtrl.pop();
    // this.navCtrl.setRoot(MyApp);
}
  
}
