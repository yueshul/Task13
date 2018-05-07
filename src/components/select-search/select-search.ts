import { Component } from '@angular/core';

/**
 * Generated class for the SelectSearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'select-search',
  templateUrl: 'select-search.html'
})
export class SelectSearchComponent {

  text: string;

  constructor() {
    console.log('Hello SelectSearchComponent Component');
    this.text = 'Hello World';
  }

}
