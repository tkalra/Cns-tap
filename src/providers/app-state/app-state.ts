import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { StorageProvider } from '../storage/storage';

const DB_KEY = 'app';

export class AppState {
  isSessionStarted: boolean = false;
  isShownTutorial: boolean = false;
}

@Injectable()
export class AppStateProvider {

  state: AppState;

  constructor(private storageProvider: StorageProvider) {
    let state = this.storageProvider.get(DB_KEY);
    if (!state) {
      this.state = new AppState();
    } else {
      this.state = state;
      this.state.isSessionStarted = false;
    }
  }

  get() {
    return this.state;
  }

  save() {
    this.storageProvider.set(DB_KEY, this.state);
  }

}
