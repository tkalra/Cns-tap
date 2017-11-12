import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { HistoryPage } from '../history/history';
import { AppState, AppStateProvider } from '../../providers/app-state/app-state';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = HistoryPage;
  tab3Root = AboutPage;

  appState: AppState;

  constructor(public appStateProvider: AppStateProvider) {
    this.appState = this.appStateProvider.get();
  }
}
