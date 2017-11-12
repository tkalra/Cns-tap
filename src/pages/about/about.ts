import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { SlidesPage } from '../slides/slides';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  constructor(public navCtrl: NavController, private appCtrl: App) {}

  showSlides() {
    this.appCtrl.getRootNav().push(SlidesPage);
  }
}
