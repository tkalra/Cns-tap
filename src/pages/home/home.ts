import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

const COUNTDOWN_TIMER = 10;
enum PageStates {
  Start = 'start-page',
  Tap = 'tap-page',
  Result = 'result-page'
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  PageStates = PageStates;
  state = PageStates.Start;
  pageClass = ['start-page', 'tap-page', 'result-page'];
  currentPageClass;
  countdown: number = COUNTDOWN_TIMER;
  isSessionStarted: boolean = false;
  timesClicked: number = 0;

  constructor(public navCtrl: NavController) {}

  showPage(pageState) {
    this.state = pageState;
    this.currentPageClass = pageState;
  }

  startSession() {
    this.countdown = COUNTDOWN_TIMER;
    this.timesClicked = 0;
    this.showPage(PageStates.Tap);

    var countdownTimer = () => {
      setTimeout(() => {
        this.countdown--;
        if (this.countdown >= 0) {
          countdownTimer();
        } else {
          this.isSessionStarted = false;
          this.showPage(PageStates.Result);
        }
      }, 1000);
    };
    this.isSessionStarted = true;
    countdownTimer();
  }

  handleClick() {
    if (this.isSessionStarted) {
      this.timesClicked++;
      this.currentPageClass = PageStates.Tap + ' page-clicked';
      setTimeout(() => {
        this.currentPageClass = PageStates.Tap;
      }, 100);
    }
  }
}
