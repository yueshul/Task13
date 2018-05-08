import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated clabus_options for the RoutePage page.
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
  alertType : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('hehe');
    console.log(navParams);
    this.routes = navParams.get('routes');
    console.log('all routes')
    console.log(JSON.stringify(this.routes, null, 2));
    
    this.callback = navParams.get('callback');
    
    for (let route of this.routes) {
      
      route['text'] = this.generateDescription(route)['s'];
      route['routenumber'] = this.generateDescription(route)['bus_options'];
      // route['list'] = this.generateDescription(route);
      console.log('route text');
      console.log(route);
      
    }
  }

  generateDescription(route : any) : {} {
    let leg : any = route['legs'][0];
    let temp: any = route['legs'][0]['steps'];

    let s : string = '';
    let bus_options : string = '';
    
    let list: string[] = []; 

    for (let i of temp) {
        if (i['travel_mode'] == 'TRANSIT') {
              list.push(i['transit_details']['line']['short_name'])
        }
        
    };
    // bus_options = list[0];
    for (let j of list) {
      
      bus_options +=  j + "->"
    }

    bus_options = bus_options.substring(0, bus_options.length - 2)

    // s = leg['departure_time']['text'] + '-' + leg['arrival_time']['text'] + 
    // ' , ' + leg['distance']['text'] + ' , ' + leg['duration']['text'] ;

    s = leg['departure_time']['text'] + '-' + leg['arrival_time']['text'] + 
    ' , ' + leg['distance']['text'] + ' , ' + leg['duration']['text'] ;

    
    return {
      s:s,
      bus_options:bus_options};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoutePage');
    console.log(this.routes);
  }

  routeSelected(route : any) {
    console.log(route);
    this.callback({route: route, alert : this.alertType});
    this.goBackToHome();
  }

  goBackToHome() {
    this.navCtrl.pop();    
  }

}
