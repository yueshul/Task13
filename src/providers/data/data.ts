import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as papa from 'papaparse';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  path : string = "./assets/files/stops.txt";
  map : Map<string, string> = new Map();

  homeAddr : string;

  homeSetUp : boolean = false;
  workAddr : string;
  workSetUp : boolean = false;

  favorites : string[]= []

  constructor(public http : HttpClient) {
    this.http.get(this.path, {responseType: 'text'}).subscribe(data => {
      this.path.substr

      // console.log(data)
      let parsedData = papa.parse(data).data;
      parsedData.splice(0, 1);

      for (let row of parsedData) {
        let stop = row[2]
        this.map.set(stop, row[1]);
      }

      console.log(this.map)
    }
  )};


  getStopId(stop : string) : string {
    if (!this.map.has(stop)) {
      console.log("stop not found: " + stop);
    }

    return this.map.get(stop);
  }

  addFavorite(favorite : string) {
    this.favorites.push(favorite);
  }

  getFavorites() : string[]{
    return this.favorites;
  }



  getStreetAddr(fullAddr : string) {
    return fullAddr.split(',')[0];
  }

}
