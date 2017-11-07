import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Data, DataProvider } from '../../providers/data/data';

const COUNTDOWN_TIMER = 10;
const START_ANOTHER_SESSION_DELAY = 3000; // in ms

const PageStates = {
  Start: 'start-page',
  Tap: 'tap-page',
  Result: 'result-page'
};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  PageStates = PageStates;
  state = PageStates.Start;
  pageClass = [PageStates.Start, PageStates.Tap, PageStates.Result];
  currentPageClass;
  countdown: number = COUNTDOWN_TIMER;
  isSessionStarted: boolean = false;
  timesClicked: number = 0;
  today: Data; // Today's result

  isDoneButtonShown: boolean = false;

  constructor(public navCtrl: NavController, private dataProvider: DataProvider) {
    this.today = dataProvider.getToday();
  }

  showPage(pageState) {
    this.state = pageState;
    this.currentPageClass = pageState;
  }

  startSession() {
    var countdownTimer = () => {
      setTimeout(() => {
        this.countdown--;
        if (this.countdown > 0) {
          countdownTimer();
        } else {
          this.dataProvider.record(this.timesClicked);
          this.isSessionStarted = false;
          this.today = this.dataProvider.getToday();
          this.isDoneButtonShown = false;
          setTimeout(() => {
            this.isDoneButtonShown = true;
          }, START_ANOTHER_SESSION_DELAY);
          this.showPage(PageStates.Result);
        }
      }, 1000);
    };

    this.isSessionStarted = true;
    this.countdown = COUNTDOWN_TIMER;
    this.timesClicked = 0;
    this.showPage(PageStates.Tap);
    countdownTimer();
  }

  handleClick() {
    if (this.isSessionStarted) {
      this.timesClicked++;
    }
  }

  ionViewDidLeave() {
    this.showPage(PageStates.Start);
  }

  ionViewCanLeave(): boolean {
    return !this.isSessionStarted;
  }
}
