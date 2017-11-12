import { Data, DataProvider } from '../../providers/data/data';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

export class ChartData {
  data: Array<any> = [
    {
      data: [],
      label: 'Right Hand'
    },
    {
      data: [],
      label: 'Left Hand'
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
      let seriesRight = this.chartData[0];
      let seriesLeft = this.chartData[1];
      seriesRight.data.push(Math.round(entry.result * 10) / 10);
      seriesLeft.data.push(Math.floor(Math.random() * entry.result * 2)); // random [0, 2 * right hand result]
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
      backgroundColor: 'rgba(230, 1, 21, 0.1)',
      borderColor: '#CA0335',
      pointBackgroundColor: '#96043E',
      pointBorderColor: '#FFFFFF',
      pointHoverBackgroundColor: '#FFFFFF',
      pointHoverBorderColor: '#CA0335'
    },
    {
      backgroundColor: 'rgba(100, 1, 13, 0.3)',
      borderColor: '#7F0221',
      pointBackgroundColor: '#96043E',
      pointBorderColor: '#FFFFFF',
      pointHoverBackgroundColor: '#FFFFFF',
      pointHoverBorderColor: '#7F0221'
    }
  ];
}
