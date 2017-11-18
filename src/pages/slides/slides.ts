import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-slides',
  templateUrl: 'slides.html'
})
export class SlidesPage {
  slides = [
    {
      title: 'What is the purpose of the app ?',
      description: `The Finger Tapping Test (FTT; Reitan & Wolfson, 1993),
                     "also called the Finger Oscillation Test, has a long history in the field of neuropsychology, both as part of the Halstead-Reitan Neuropsychological Battery (HRNB) and as a standalone test 
                    it can be `
    },
    {
      title: 'How to perform the test ?',
      description: 'lorem ipsum...'
    },
    {
      title: '',
      description: "but I don't have one"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  endSlides() {
    this.navCtrl.pop();
  }
}
