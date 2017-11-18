import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { HistoryPage } from '../history/history';
import { AppState, AppStateProvider } from '../../providers/app-state/app-state';
import { SlidesPage } from '../slides/slides';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = HistoryPage;
  tab3Root = AboutPage;

  appState: AppState;

  constructor(public appStateProvider: AppStateProvider, private appCtrl: App) {
    this.appState = this.appStateProvider.get();

    if (!this.appState.isShownTutorial) {
      this.appCtrl.getRootNav().push(SlidesPage);
      this.appState.isShownTutorial = true;
      this.appStateProvider.save();
    }
  }
}
