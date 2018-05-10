import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-alert-type',
  templateUrl: 'alert-type.html'
})
export class AlertTypePage {

  constructor(public navCtrl: NavController) {
  }
  goback() {
    this.navCtrl.pop();
    // this.navCtrl.setRoot(HomePage);
}
  
}