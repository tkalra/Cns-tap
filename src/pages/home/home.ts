import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Rgb, ColorProvider } from '../../providers/color/color';
import { DataProvider } from '../../providers/data/data';

const COUNTDOWN_TIMER = 10;
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
  tapColor;

  constructor(
    public navCtrl: NavController,
    private colorProvider: ColorProvider,
    private dataProvider: DataProvider
  ) {}

  showPage(pageState) {
    this.state = pageState;
    this.currentPageClass = pageState;
  }

  startSession() {
    this.countdown = COUNTDOWN_TIMER;
    this.timesClicked = 0;
    this.tapColor = { r: 255, g: 160, b: 0 };
    this.showPage(PageStates.Tap);

    var countdownTimer = () => {
      setTimeout(() => {
        this.countdown--;
        if (this.countdown > 0) {
          countdownTimer();
        } else {
          this.dataProvider.record(this.timesClicked);
          this.isSessionStarted = false;
          this.showPage(PageStates.Result);
        }
      }, 1000);
    };
    countdownTimer();
    this.isSessionStarted = true;
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

  ionViewDidLeave() {
    this.showPage(PageStates.Start);
  }

  ionViewCanLeave(): boolean {
    console.log(this.isSessionStarted);
    return !this.isSessionStarted;
  }
}
