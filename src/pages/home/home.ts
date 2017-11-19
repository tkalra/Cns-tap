import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Data, DataProvider } from '../../providers/data/data';
import { AppState, AppStateProvider } from '../../providers/app-state/app-state';

const COUNTDOWN_TIMER = 10;
const START_ANOTHER_SESSION_DELAY = 2000; // in ms

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
  avgTimeBetweenTaps: number = 0;
  startTapTime: Date;
  todayLeft: Data; // Today's result
  todayRight: Data; // Today's result
  isDoneButtonShown: boolean = false;
  hand: boolean = false; // false is right hand

  appState: AppState;

  constructor(public navCtrl: NavController, private dataProvider: DataProvider, appStateProvider: AppStateProvider) {
    this.appState = appStateProvider.get();
    this.updateTodayData();
  }

  updateTodayData() {
    let today = this.dataProvider.getToday();

    let todayLeft = null;
    let todayRight = null;
    for (var i = 0, len = today.length; i < len && (todayLeft === null || todayRight === null); i++) {
      var result = today[i];
      if (result.hand === true) {
        todayLeft = result;
      } else {
        todayRight = result;
      }
    }

    this.todayLeft = todayLeft;
    this.todayRight = todayRight;
  }

  switchHand(handType) {
    this.hand = handType;
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
          this.dataProvider.record(this.timesClicked, this.hand, Number(this.avgTimeBetweenTaps.toFixed(3)));
          this.appState.isSessionStarted = false;
          this.updateTodayData();
          this.isDoneButtonShown = false;
          setTimeout(() => {
            this.isDoneButtonShown = true;
          }, START_ANOTHER_SESSION_DELAY);
          this.showPage(PageStates.Result);
        }
      }, 1000);
    };

    this.appState.isSessionStarted = true;
    this.countdown = COUNTDOWN_TIMER;
    this.timesClicked = 0;
    this.showPage(PageStates.Tap);
    countdownTimer();
  }

  handleClick() {
    if (this.appState.isSessionStarted) {
      this.timesClicked++;
      if (!this.startTapTime) {
        this.startTapTime = new Date();
      } else {
        let currentDate = new Date();
        let timeBetween = currentDate.getTime() - this.startTapTime.getTime();

        if (this.avgTimeBetweenTaps) {
          this.avgTimeBetweenTaps += timeBetween;
          this.avgTimeBetweenTaps /= 2;
        } else {
          this.avgTimeBetweenTaps = timeBetween;
        }
        this.startTapTime = currentDate;
      }
    }
  }

  ionViewDidLeave() {
    this.showPage(PageStates.Start);
  }
}
