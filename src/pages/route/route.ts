import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DataProvider } from '../../providers/data/data';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
   public dataProvider : DataProvider) {
    console.log('hehe');
    console.log(navParams);
    this.routes = navParams.get('routes');
    console.log('all routes')
    console.log(JSON.stringify(this.routes, null, 2));
    
    this.callback = navParams.get('callback');
    
    for (let route of this.routes) {
      
      let des = this.generateDescription(route);

      if (des == null) {
        route['dep'] = "Now";
        route['arr'] = "5 Min";
        route['bus_options'] = "Walking";
        route['transitsteps']= [];
        continue;
      }
      else {
        route['dep_stop'] = des['dep_stop'];
        route['arr_stop'] = des['arr_stop'];
        route['dep_stop_time'] = des['dep_stop_time'];
        route['arr_stop_time'] = des['arr_stop_time']; 
        route['start_addr'] = des['start_addr'];
        route['end_addr'] = des['end_addr'];
      route['dep'] = des['dep'];
      route['arr'] = des['arr'];
      route['dis'] = des['dis'];
      route['dur'] = des['dur'];
      route['bus_options'] = des['bus_options'];
      route['direction'] = des['direction'];
      // route['arr'] = this.generateDescription(route)['arr'];
      // route['walkingsteps']= this.generateDescription(route)['walkingsteps'];
      route['transitsteps']= this.generateDescription(route)['transitsteps'];

      // route['list'] = this.generateDescription(route);
      console.log('route text');
      console.log(route);
    }
    }
  }

  generateDescription(route : any) : {} {
    let leg : any = route['legs'][0];

    if (leg['departure_time'] == null || leg['arrival_time'] == null) {
      return null;
    }

    let temp: any = route['legs'][0]['steps'];

    let s : string = '';
    let dep : string = '';
    let arr : string = '';
    let dis : string = '';
    let dur : string = '';

    let steps : string[] = [];
    // let walkingsteps : string[] = [];
    let transitsteps : string[] = [];

    let bus_options : string = '';
    let directions : string[] = [];
    let direction : string = '';
    let list: string[] = []; 

    let start_addr : string = this.dataProvider.getStreetAddr(leg['start_address']);
    let end_addr : string = this.dataProvider.getStreetAddr(leg['end_address']);

    let dep_stop : string;
    let arr_stop : string;
    let dep_stop_time : string;
    let arr_stop_time : string;
    
    for (let i of temp) {
        if (i['travel_mode'] == 'TRANSIT') {

              if (dep_stop == null) {
                dep_stop = i['transit_details']['departure_stop']['text']
                dep_stop_time = i['transit_details']['departure_time']['text']
              }

              arr_stop = i['transit_details']['arrival_stop']['text']
              arr_stop_time = i['transit_details']['arrival_time']['text']
              
              directions.push(i['transit_details']['headsign'])
              list.push(i['transit_details']['line']['short_name'])
        }
        
    };
    direction = directions[0];
    // bus_options = list[0];
    for (let j of list) {
      
      bus_options +=  j + "-> "
    }
    bus_options = bus_options.substring(0, bus_options.length - 3)

    s = leg['departure_time']['text'] + '-' + leg['arrival_time']['text'] + 
    ' , ' + leg['distance']['text'] + ' , ' + leg['duration']['text'] ;

    dep = leg['departure_time']['text'];
    arr = leg['arrival_time']['text'];
    dis = leg['distance']['text'];
    dur = leg['duration']['text'];

    steps = leg['steps'];

    for (let k of steps) {
       
       temp = k['travel_mode']
      //  textsteps.push(k['trave l_mode'] + ":"
       if (temp =='WALKING') {
          if (k['steps'][0].length > 1) {
            for (let l of k['steps'][0]) {
               transitsteps.push(l['html_instructions'])
            }
            
          } else{
            transitsteps.push(k['html_instructions'])
          }
       }
       else {
          transitsteps.push(k['html_instructions'])
       }
    }


    
    return {
      dep_stop : dep_stop,
      arr_stop : arr_stop,
      dep_stop_time : dep_stop_time,
      arr_stop_time : arr_stop_time,
      start_addr : start_addr,
      end_addr : end_addr,
      dep : dep,
      arr : arr,
      dis:dis,
      dur :dur,
      direction,
      bus_options:bus_options,
      transitsteps: transitsteps};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoutePage');
    console.log(this.routes);
  }

  routeSelected(route : any) {
    console.log(route);
    this.callback({route : route, alertType : this.alertType});
    this.goBackToHome();
  }

  goBackToHome() {
    this.navCtrl.pop();    
  }

}
