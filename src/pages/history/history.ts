import { DataProvider, Data } from '../../providers/data/data';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

export class ChartData {
  data: Array<any> = [
    {
      data: [],
      label: 'This Week'
    }
  ];
}

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {
  data: Data[];
  chartData: Array<any> = new ChartData().data;

  chartLabels: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {}

  loadData() {
    this.data = this.dataProvider.getThisWeek();
    this.chartData = new ChartData().data;
    this.data.forEach(entry => {
      let series = this.chartData[0];
      series.data.push(entry.result);
    });
  }

  ionViewDidEnter() {
    this.loadData();
  }

  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';
}
