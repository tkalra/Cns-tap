import { Data, DataProvider } from '../../providers/data/data';
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
      series.data.push(Math.round(entry.result * 10) / 10);
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
      backgroundColor: 'rgba(79, 1, 21, 0.5)',
      borderColor: '#CA0335',
      pointBackgroundColor: '#96043E',
      pointBorderColor: '#5B1646',
      pointHoverBackgroundColor: '#FFFFFF'
    }
  ];
}
