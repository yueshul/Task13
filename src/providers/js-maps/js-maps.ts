import { Injectable } from '@angular/core';

declare var google;

@Injectable()
export class JsMapsProvider {

  map: any;
  
  constructor() {
  }

  init(location, element){
    let latLng = new google.maps.LatLng(location.latitude, location.longitude);

    let opts = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(element.nativeElement, opts);

    console.log("to add marker");
    let marker = new google.maps.Marker({
      position: latLng,
      map: this.map
    });
    console.log("marker added");
  }
}