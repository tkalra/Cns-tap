import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
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
  areSlidesShown: boolean = false;

  constructor(public navCtrl: NavController) {}

  toggleSlides() {
    console.log('here');
    if (this.areSlidesShown) {
      this.areSlidesShown = false;
    } else {
      this.areSlidesShown = true;
    }
  }
}
