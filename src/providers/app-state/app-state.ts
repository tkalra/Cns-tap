import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

export class AppState {
  isSessionStarted: boolean = false;
}

@Injectable()
export class AppStateProvider {

  state: AppState = new AppState();

  constructor() {}

  get() {
    return this.state;
  }

}
