import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapsProvider } from '../providers/maps/maps';
import { JsMapsProvider } from '../providers/js-maps/js-maps';
import { NativeMapsProvider } from '../providers/native-maps/native-maps';
import { HttpClientModule } from '@angular/common/http';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { RoutePage } from '../pages/route/route';
import { RoutePageModule } from '../pages/route/route.module';

import { BusAlarmPage } from '../pages/bus-alarm/bus-alarm';
import { AlertTypePage } from '../pages/alert-type/alert-type';
import { FavoritePage } from '../pages/favorite/favorite';

import { DataProvider } from '../providers/data/data';
import { TripInfoPage } from '../pages/trip-info/trip-info';
import { TripInfoPageModule } from '../pages/trip-info/trip-info.module';
import { AddHomePage } from '../pages/addHome/addhome';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BusAlarmPage,
    AlertTypePage,
    FavoritePage,
    AddHomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    SelectSearchableModule,
    RoutePageModule,
    TripInfoPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RoutePage,
    FavoritePage,
    BusAlarmPage,
    AlertTypePage,
    TripInfoPage,
    AddHomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    MapsProvider,
    JsMapsProvider,
    NativeMapsProvider,
    DataProvider
  ]
})
export class AppModule {}
