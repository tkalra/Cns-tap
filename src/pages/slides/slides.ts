import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-slides',
  templateUrl: 'slides.html'
})
export class SlidesPage {
  slides = [
    {
      title: 'What is Finger Tapping Test ?',
      description: `The Finger Tapping Test,
                     also called the Finger Oscillation Test, has a long history in the field of neuropsychology an acurate predictor of the health of your Central Nervous System.
                     This task is frequently used to quantitatively evaluate patients with Parkinson’s disease, ataxia, Alzheimer’s disease, and Korsakoff syndrome, as well as in individuals who have suffered an acute stroke.
                      It is a really simple, time effective and acurate way of gathering data about the health of your nerveous system.`
    },
    {
      title: 'How this helps with your health/fitness goals?',
      description: `You should start with doing the 10 sec tap test every morning and in the begining to set a baseline you should do it after you have rested atleast 4 days after a workout session. After you have an intense workout your musculoskeletal system along with your nervous system is fatigued, 
                    so doing a test on days after you worked out is good to see if your nervous system is recovered because if your nervous system has not yet adapted to the last workout then your musculoskeletal has most definitely not made that adaption either.
                     So going for another workout will basically lead to overtraining and you should wait untill your tap result is near the baseline. `
    },
    {
      title: 'How to do the test ?',
      description:
        'Your palm should be immobile and flat on a table, with fingers extended, and the index finder placed on the mobile screen. You should only move your finger to tap and not flex your elbow just inorder to tap faster that will defeat the purpose of the test and give you irregular data.'
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  endSlides() {
    this.navCtrl.pop();
  }
}
