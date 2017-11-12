import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HistoryPage } from '../pages/history/history';
import { HomePage } from '../pages/home/home';
import { SlidesPage } from '../pages/slides/slides';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { TapColorDirective } from '../directives/tap-color/tap-color';
import { ColorProvider } from '../providers/color/color';
import { DataProvider } from '../providers/data/data';
import { AppStateProvider } from '../providers/app-state/app-state';
import { StorageProvider } from '../providers/storage/storage';

@NgModule({
  declarations: [MyApp, AboutPage, ContactPage, HistoryPage, HomePage, SlidesPage, TabsPage, TapColorDirective],
  imports: [BrowserModule, ChartsModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, AboutPage, ContactPage, HistoryPage, HomePage, SlidesPage, TabsPage],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ColorProvider,
    DataProvider,
    AppStateProvider,
    StorageProvider
  ]
})
export class AppModule {}
