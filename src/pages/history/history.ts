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
  dataArray: Array<Data[]>;
  chartData: Array<any> = new ChartData().data;

  chartLabels: Array<any> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {}

  loadData() {
    this.chartData = new ChartData().data;
    let seriesRight = this.chartData[0];
    let seriesLeft = this.chartData[1];
    this.dataArray = this.dataProvider.getThisWeek();
    this.dataArray.forEach(results => {
      if (results.length) {
        let sumLeft: number = 0;
        let numSessionsLeft: number = 0;

        let sumRight: number = 0;
        let numSessionsRight: number = 0;
        results.forEach(entry => {
          if (entry.hand) {
            sumLeft += entry.result;
            numSessionsLeft++;
          } else {
            sumRight += entry.result;
            numSessionsRight++;
          }
        });
        if (sumRight === 0) {
          seriesRight.data.push(0);
        } else {
          seriesRight.data.push(Math.round(sumRight / numSessionsRight * 10) / 10);
        }
        if (sumLeft === 0) {
          seriesLeft.data.push(0);
        } else {
          seriesLeft.data.push(Math.round(sumLeft / numSessionsLeft * 10) / 10);
        }
      } else {
        seriesLeft.data.push(0);
        seriesRight.data.push(0);
      }
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
    },
    tooltips: {
      enabled: false
    },
    elements: {
      point: {
        hoverRadius: 3
      }
    }
  };

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(230, 1, 21, 0.3)',
      borderColor: '#CA0335',
      pointBackgroundColor: '#CA0335',
      pointBorderColor: '#FFFFFF'
      // pointHoverBackgroundColor: '#FFFFFF',
      // pointHoverBorderColor: '#CA0335'
    },
    {
      backgroundColor: 'rgba(255, 196, 0, 0.8)',
      borderColor: '#FFC400',
      pointBackgroundColor: '#FFC400',
      pointBorderColor: '#FFFFFF'
      // pointHoverBackgroundColor: '#FFFFFF',
      // pointHoverBorderColor: '#7F0221'
    }
  ];
}
