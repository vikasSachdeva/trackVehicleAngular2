import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'chart.js/src/chart';
import { DomSanitizer } from '@angular/platform-browser';
// import { CustomNavbar } from '../../pipes/headerNav/template.component';
declare var Chart;

@Component({
  selector: 'board',
  templateUrl: 'board.html'
})
export class BoardComponent {
    constructor(public navCtrl: NavController, private sanitizer: DomSanitizer) { }
    // lineChart
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Active Requests' },
    //{ data: [28, 48, 40, 19, 46, 27, 10], label: 'Pending Requests' }
       
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    animation: false,
    responsive: true,
     scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Month'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Number of Requests'
                            }
                        }]
                    }
  };
  public lineChartColors: Array<any> = [
    { // primary
      backgroundColor: 'rgba(0, 150, 136,0.2)',
      borderColor: 'rgba(0, 150, 136,1)',
      pointBackgroundColor: 'rgba(0, 150, 136,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0, 150, 136,0.8)'
    },
    { // secondary
      backgroundColor: 'rgba(20, 121, 201,0.2)',
      borderColor: 'rgba(20, 121, 201,1)',
      pointBackgroundColor: 'rgba(20, 121, 201,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(20, 121, 201,1)'
    },
    { // third
      backgroundColor: 'rgba(0, 128, 0, 0.5)',
      borderColor: 'rgba(0, 128, 0, 1)',
      pointBackgroundColor: 'rgba(20, 121, 201,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(20, 121, 201,1)'
    },
    { // four
      backgroundColor: 'rgba(165, 42, 42, 0.5)',
      borderColor: 'rgba(165, 42, 42, 1)',
      pointBackgroundColor: 'rgba(20, 121, 201,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(20, 121, 201,1)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  // bar
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Month'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Number of Vehicles'
                            }
                        }]
                    }
  };
  public barChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [
    //{ data: [15, 29, 30, 15, 26, 35], label: 'Awaiting acceptance' },
    { data: [28, 48, 30, 30, 70, 27], label: 'Vehicles In Transit' },
    { data: [28, 48, 40, 25, 60, 35], label: 'Vehicles Tracking On' },
    { data: [65, 59, 45, 40, 50, 30], label: 'Vehicles Running Late' },

  ];

  // // lineChart
  // public lineChartData: Array<any> = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  // ];
  // public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // public lineChartOptions: any = {
  //   animation: false,
  //   responsive: true
  // };
  // public lineChartColors: Array<any> = [
  //   { // primary
  //     backgroundColor: 'rgba(0, 150, 136,0.2)',
  //     borderColor: 'rgba(0, 150, 136,1)',
  //     pointBackgroundColor: 'rgba(0, 150, 136,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(0, 150, 136,0.8)'
  //   },
  //   { // secondary
  //     backgroundColor: 'rgba(20, 121, 201,0.2)',
  //     borderColor: 'rgba(20, 121, 201,1)',
  //     pointBackgroundColor: 'rgba(20, 121, 201,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(20, 121, 201,1)'
  //   }
  // ];
  // public lineChartLegend: boolean = true;
  // public lineChartType: string = 'line';

  // // bar
  // public barChartOptions: any = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };
  // public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // public barChartType: string = 'bar';
  // public barChartLegend: boolean = true;
  // public barChartData: any[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  // ];

  // // Doughnut
  // public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // public doughnutChartData: number[] = [350, 450, 100];
  // public doughnutChartType: string = 'doughnut';

  // // Radar
  // public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
  // public radarChartData: any = [
  //   { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
  // ];
  // public radarChartType: string = 'radar';

  // // Pie
  // public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  // public pieChartData: number[] = [300, 500, 100];
  // public pieChartType: string = 'pie';


  // // PolarArea
  // public polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  // public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
  // public polarAreaLegend: boolean = true;

  // public polarAreaChartType: string = 'polarArea';

}
