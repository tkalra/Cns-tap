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
}

@Injectable()
export class DataProvider {
  tapDbByKey: { [key: string]: number };
  tapDb: Data[];

  constructor() {
    let tapDb = localStorage.get(DB_KEY);
    if (!tapDb) {
      this.tapDb = [];
      this.tapDbByKey = {};
    } else {
      tapDb = this.decompress(tapDb);
      tapDb.forEach((el: Data) => {
        this.tapDbByKey[el.date] = el.result;
      });
      this.tapDb = tapDb;
    }
  }

  save() {
    localStorage.set(DB_KEY, this.compress(this.tapDb));
  }

  record(tapResult: number) {
    const dateString = this.getDateString(new Date());
    if (this.tapDbByKey[dateString]) {
      // Average the result
      this.tapDbByKey[dateString] += tapResult;
      this.tapDbByKey[dateString] /= 2;
    } else {
      this.tapDbByKey[dateString] = tapResult;

      let data = new Data();
      data.date = dateString;
      data.result = tapResult;
      this.tapDb.unshift(data);
    }

    if (this.tapDb.length > DAYS_SAVED) {
      this.tapDb.pop();
    }

    this.save();
  }

  getThisWeek() {
    const currentDate = new Date();
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day == 0 ? -6 : 1);
    const startWeek = new Date(currentDate.setDate(diff));

    var resultsArray = [];
    for (let i = 0; i < 7; i++) {
      var dateString = this.getDateString(startWeek);
      var result = this.tapDbByKey[dateString];
      if (result) {
        resultsArray.push(result);
      } else {
        var emptyData = new Data();
        emptyData.date = dateString;
        emptyData.result = 0;
        resultsArray.push(emptyData);
      }
    }

    return resultsArray;
  }

  private getDateString(date: Date): string {
    return date.getUTCFullYear() + '-' + date.getUTCMonth() + '-' + date.getUTCDate();
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
