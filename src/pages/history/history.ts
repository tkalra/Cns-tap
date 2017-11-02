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

  chartLabels: Array<any> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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
      xAxes: [
        {
          ticks: {
            autoSkip: false
          }
        }
      ],
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
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(144, 202, 249, 0.5)',
      borderColor: '#2196f3',
      pointBackgroundColor: 'rgba(1, 87, 155, 1)',
      pointBorderColor: 'rgba(0, 150, 136, 1)',
      pointHoverBackgroundColor: '#fff'
      // pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
}
