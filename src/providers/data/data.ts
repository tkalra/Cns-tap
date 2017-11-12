import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

const DB_KEY = 'db';
const DAYS_SAVED = 365 * 2 + 1; // 2 years with leap year

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

export class Data {
  date: string;
  result: number = 0;
  hand: boolean = false;
  avgTimeBetweenTaps: number = 0;
}

@Injectable()
export class DataProvider {
  tapDbByKey: { [key: string]: Data[] } = {}; // Hash for indexing Data using dates.
  tapDb: Data[];

  constructor() {
    let tapDb = localStorage.get(DB_KEY); // DataBase
    if (!tapDb) {
      this.tapDb = [];
      this.tapDbByKey = {};
    } else {
      tapDb = this.decompress(tapDb);
      tapDb.forEach((el: Data) => {
        let date = el.date;
        let dataByDate = this.tapDbByKey[date];
        if (!dataByDate) {
          this.tapDbByKey[date] = [];
        }

        this.tapDbByKey[date].push(el);
      });
      this.tapDb = tapDb;
    }
  }

  save() {
    if (this.tapDb.length > DAYS_SAVED) {
      this.tapDb.pop();
    }

    localStorage.set(DB_KEY, this.compress(this.tapDb));
  }

  record(tapResult: number, hand: boolean) {
    const dateString = this.getDateString(new Date());
    let data = new Data();
    data.date = dateString;
    data.result = tapResult;

    this.tapDb.unshift(data); // Move the current entry to the top of the database.

    if (!this.tapDbByKey[dateString]) {
      this.tapDbByKey[dateString] = [];
    }
    this.tapDbByKey[dateString].push(data);
    this.save();
  }

  getToday() {
    const currentDate = new Date();
    const dateString = this.getDateString(currentDate);
    var result = this.tapDbByKey[dateString];
    if (result) {
      return result;
    }
    return null;
  }

  getThisWeek() {
    const currentDate = new Date();
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day == 0 ? -6 : 1);
    const startWeek = new Date(currentDate.setDate(diff));

    let resultsArray = [];
    for (let i = 0; i < 7; i++) {
      let dateString = this.getDateString(startWeek);
      let result: Data = this.tapDbByKey[dateString];
      if (result) {
        resultsArray.push(result);
      } else {
        let emptyData = new Data();
        emptyData.date = dateString;
        emptyData.result = 0;
        resultsArray.push(emptyData);
      }

      startWeek.setDate(startWeek.getDate() + 1);
    }

    return resultsArray;
  }

  private getDateString(date: Date): string {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  private compress(db) {
    let compressedDb = [];
    db.forEach((entry: Data) => {
      compressedDb.push([entry.date, entry.result]);
    });

    return compressedDb;
  }

  private decompress(db) {
    let decompressedDb = [];
    db.forEach((entry: Data) => {
      let data = new Data();
      data.date = entry[0];
      data.result = entry[1];
      decompressedDb.push(data);
    });

    return decompressedDb;
  }
}
