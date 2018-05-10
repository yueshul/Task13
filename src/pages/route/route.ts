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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('hehe');
    console.log(navParams);
    this.routes = navParams.get('routes');
    console.log('all routes')
    console.log(JSON.stringify(this.routes, null, 2));
    
    this.callback = navParams.get('callback');
    
    for (let route of this.routes) {
      
      route['dep'] = this.generateDescription(route)['dep'];
      route['arr'] = this.generateDescription(route)['arr'];
      route['dis'] = this.generateDescription(route)['dis'];
      route['dur'] = this.generateDescription(route)['dur'];
      route['bus_options'] = this.generateDescription(route)['bus_options'];
      route['direction'] = this.generateDescription(route)['direction'];
      route['arr'] = this.generateDescription(route)['arr'];
      // route['walkingsteps']= this.generateDescription(route)['walkingsteps'];
      route['transitsteps']= this.generateDescription(route)['transitsteps'];

      // route['list'] = this.generateDescription(route);
      console.log('route text');
      console.log(route);
      
    }
  }

  generateDescription(route : any) : {} {
    let leg : any = route['legs'][0];
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

    for (let i of temp) {
        if (i['travel_mode'] == 'TRANSIT') {
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
  //   if (list.length > 1) {
  //     bus_options = bus_options.substring(0, bus_options.length - 3)
  //   } else {
  //     bus_options = "Good evening";
  // }
    

    // s = leg['departure_time']['text'] + '-' + leg['arrival_time']['text'] + 
    // ' , ' + leg['distance']['text'] + ' , ' + leg['duration']['text'] ;

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
    this.callback(route);
    this.goBackToHome();
  }

  goBackToHome() {
    this.navCtrl.pop();    
  }

}
