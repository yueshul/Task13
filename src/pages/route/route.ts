import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the RoutePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-route',
  templateUrl: 'route.html',
})
export class RoutePage {

  route_intro : string[];
  routes : any;
  callback : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('hehe');
    console.log(navParams);
    this.routes = navParams.get('routes');
    this.callback = navParams.get('callback');

    for (let route of this.routes) {
      route['text'] = this.generateDescription(route);
      console.log(route);
    }
  }

  generateDescription(route : any) : string {
    let leg : any = route['legs'][0];
    let s : string = '';
    s = leg['departure_time']['text'] + '-' + leg['arrival_time']['text'] + 
    ' , ' + leg['distance']['text'] + ' , ' + leg['duration']['text'];
    return s;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoutePage');
    console.log(this.routes);
  }

  routeSelected(route : any) {
    console.log(route);
    this.callback(route);
    this.goBackToHome();
  }

  goBackToHome() {
    this.navCtrl.pop();    
  }

}
