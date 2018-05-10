import { Component, ElementRef, Renderer } from '@angular/core';
import { DomController, Platform } from 'ionic-angular';

/**
 * Generated class for the ContentDrawerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'content-drawer',
  templateUrl: 'content-drawer.html'
})
export class ContentDrawerComponent {

  text: string = "hehe";

  constructor(public element: ElementRef, public renderer: Renderer, public domCtrl: DomController, public platform: Platform) {
    console.log('Hello ContentDrawerComponent Component');
    this.text = 'Hello World';
  }

}
