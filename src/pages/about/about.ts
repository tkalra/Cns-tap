import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SlidesPage } from '../slides/slides';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  constructor(public navCtrl: NavController) {}

  showSlides() {
    this.navCtrl.push(SlidesPage);
  }
}
