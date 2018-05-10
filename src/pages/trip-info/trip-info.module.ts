import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripInfoPage } from './trip-info';

@NgModule({
  declarations: [
    TripInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(TripInfoPage),
  ],
})
export class TripInfoPageModule {}
