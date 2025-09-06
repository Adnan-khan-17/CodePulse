import { Component } from '@angular/core';
import { HighchartsChartModule } from "highcharts-angular"; // Change this line
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HighchartsChartModule], // Change this line
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: 'My chart'
    },
    series: [{
      type: 'line',
      data: [1, 2, 3]
    }]
  };
}