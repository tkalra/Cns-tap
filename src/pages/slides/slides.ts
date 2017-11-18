import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-slides',
  templateUrl: 'slides.html'
})
export class SlidesPage {
  slides = [
    {
      title: 'Hello friend',
      description: "here's some content"
    },
    {
      title: 'This is the second slide',
      description: 'lorem ipsum...'
    },
    {
      title: 'You can add images',
      description: "but I don't have one"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  endSlides() {
    this.navCtrl.pop();
  }
}
