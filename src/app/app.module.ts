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


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BusAlarmPage,
    AlertTypePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    SelectSearchableModule,
    RoutePageModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RoutePage,
    BusAlarmPage,
    AlertTypePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    MapsProvider,
    JsMapsProvider,
    NativeMapsProvider
  ]
})
export class AppModule {}
