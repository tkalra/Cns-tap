import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { StorageProvider } from '../storage/storage';

const DB_KEY = 'db';
const DAYS_SAVED = 365 * 2 + 1; // 2 years with leap year

export class Data {
  date: string;
  result: number = 0;
}

@Injectable()
export class DataProvider {
  tapDbByKey: { [key: string]: Data } = {};
  tapDb: Data[];

  constructor(private storageProvider: StorageProvider) {
    let tapDb = this.storageProvider.get(DB_KEY);
    if (!tapDb) {
      this.tapDb = [];
      this.tapDbByKey = {};
    } else {
      tapDb = this.decompress(tapDb);
      tapDb.forEach((el: Data) => {
        this.tapDbByKey[el.date] = el;
      });
      this.tapDb = tapDb;
    }
  }

  save() {
    this.storageProvider.set(DB_KEY, this.compress(this.tapDb));
  }

  record(tapResult: number) {
    const dateString = this.getDateString(new Date());
    if (this.tapDbByKey[dateString]) {
      // Average the result
      let dataForDateString: Data = this.tapDbByKey[dateString];
      let result = dataForDateString.result;
      result += tapResult;
      result /= 2;
      dataForDateString.result = Math.round(result);
    } else {
      let data = new Data();
      data.date = dateString;
      data.result = tapResult;
      this.tapDb.unshift(data);
      this.tapDbByKey[dateString] = data;
    }

    if (this.tapDb.length > DAYS_SAVED) {
      this.tapDb.pop();
    }

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
