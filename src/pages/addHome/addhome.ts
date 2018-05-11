import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DataProvider } from '../../providers/data/data';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-add-Home',
  templateUrl: 'addhome.html'
})

export class AddHomePage {

  constructor(public navCtrl: NavController,
    public dataProvider : DataProvider,
    public alertCtrl: AlertController) {
  }
  goback() {
    this.navCtrl.pop();
    // this.navCtrl.setRoot(HomePage);
}
  

addHome(event : any, result : any) {
  console.log('test add home');
  console.log(event);
  // console.log(event)
  this.dataProvider.addHome(event);
  let alert = this.alertCtrl.create({
    title: 'Success',
    subTitle: event +  ' Added as Home',
    buttons: ['OK']
  });
    alert.present();
  
}


}