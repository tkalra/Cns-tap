import { DataProvider, Data } from '../../providers/data/data';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {
  data: Data[];
  chartData: Array<any> = [
    {
      data: [],
      label: 'This Week'
    }
  ];

  chartLabels: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
    this.data = this.dataProvider.getThisWeek();

    this.data = [
      {
        date: '2017-10-31',
        result: 100
      },
      {
        date: '2017-10-30',
        result: 70
      },
      {
        date: '2017-10-29',
        result: 60
      },
      {
        date: '2017-10-28',
        result: 0
      },
      {
        date: '2017-10-27',
        result: 20
      },
      {
        date: '2017-10-26',
        result: 0
      },
      {
        date: '2017-10-25',
        result: 0
      }
    ];

    this.data.forEach(entry => {
      let series = this.chartData[0];
      series.data.unshift(entry.result);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';
}
