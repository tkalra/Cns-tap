import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

const COUNTDOWN_TIMER = 10;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  state: number = 0;
  pageClass = ['start-page', 'tap-page', 'result-page'];
  currentPageClass;
  countdown: number = COUNTDOWN_TIMER;
  isSessionStarted: boolean = false;

  constructor(public navCtrl: NavController) {}

  startSession() {
    this.countdown = COUNTDOWN_TIMER;
    this.state++;
    if (this.state == 3) {
      this.state = 0;
    }
    this.currentPageClass = this.pageClass[this.state];

    var countdownTimer = () => {
      setTimeout(() => {
        this.countdown--;
        if (this.countdown >= 0) {
          countdownTimer();
        } else {
          this.isSessionStarted = false;
          this.showResult();
        }
      }, 1000);
    };
    this.isSessionStarted = true;
    countdownTimer();
  }

  showResult() {
    this.state = 2;
    this.currentPageClass = this.pageClass[this.state];
  }

  handleClick() {
    if (this.isSessionStarted) {
      this.currentPageClass = this.pageClass[1] + ' page-clicked';
      setTimeout(() => {
        this.currentPageClass = this.pageClass[1];
      }, 100);
    }
  }

  backToHome() {
    this.state = 0;
    this.currentPageClass = this.pageClass[0];
  }
}
