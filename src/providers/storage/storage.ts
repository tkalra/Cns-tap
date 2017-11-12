import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

const localStorage = {
  get: key => {
    return JSON.parse(window.localStorage[key] || 'null');
  },
  set: (key, value) => {
    window.localStorage[key] = JSON.stringify(value);
  },
  removeAll: () => {
    window.localStorage.clear();
  }
};

@Injectable()
export class StorageProvider {

  constructor() {}

  set(key: string, value: any) {
    localStorage.set(key, value);
  }

  get(key: string) {
    return localStorage.get(key);
  }

}
