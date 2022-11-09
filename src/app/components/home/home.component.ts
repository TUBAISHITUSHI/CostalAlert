import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import * as Highcharts from 'highcharts';
import { GenerelService } from '../../services/generel.service'
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;
  chartOptions: Highcharts.Options = {
    series: [ { type: 'spline', data: [] }, { type: 'spline', data: [] }, { type: 'spline', data: [] } ]
  };
  chartOptionsRain: Highcharts.Options = {
    series: [ { type: 'column', data: [] }, { type: 'line', data: [] }, { type: 'line', data: [] } ]
  };

  alert_count = {
    alert_rain: 0,
    alert_heat: 0,
    alert_cold: 0,
    alert_wind: 0
  };
  upazila_name = "";
  forecast_data:any;

  constructor(private http:HttpClient, private service: GenerelService) { }

  ngOnInit(): void {

    this.getAlert();
    this.getForecast(202216);

  }

  ngAfterViewInit(): void {
    this.intiMap();
  }

  intiMap():void {
    
  }

  onOptionsSelected(value:string){
    console.log("the selected value is " + value);
    this.getForecast(value);
  }

  async getAlert() {
    await this.service.getAlertCount().subscribe(data=>{
      this.alert_count = data;
      console.log(this.alert_count);
    });
  }

  async getForecast(upazila_id:any) {
    await this.service.getLocationForecast(upazila_id).subscribe(data=>{
      this.upazila_name = data.result.location_info.name;
      this.forecast_data = data.result;

      this.genHighchartsOptions(data.result);
      
    });
  }


  genHighchartsOptions(result:any) {
    let that = this;
    this.chartOptions = {
      title: {
        text: ""
      },
      credits: {
        enabled: false,
      },
      xAxis:{
        categories: result.forecast.date,
        gridLineWidth: 1,
      },
      yAxis: {
        title: {
          text: "Temperature",
        },
        gridLineWidth: 1,
      },
      tooltip: {
        shared: true,
      },
      series: [{
        data: result.forecast.temp_max,
        type: 'spline',
        name: 'Temp Max',
        color: '#d11919',
        tooltip: {
          valueSuffix: ' °C'
        }
      }, {
        data: result.forecast.temp_avg,
        type: 'spline',
        name: 'Temp Max',
        color: '#111919',
        tooltip: {
          valueSuffix: ' °C'
        }
      }, {
        data: result.forecast.temp_min,
        type: 'spline',
        name: 'Temp Max',
        color: '#2288dd',
        tooltip: {
          valueSuffix: ' °C'
        }
      }]
    };

    this.chartOptionsRain = {
      title: {
        text: ""
      },
      credits: {
        enabled: false,
      },
      xAxis:{
        categories: result.forecast.date,
        gridLineWidth: 1,
      },
      yAxis: {
        title: {
          text: "RF, RH & Wind Gust",
        },
        gridLineWidth: 1,
      },
      tooltip: {
        shared: true,
      },
      series: [{
        data: result.forecast.rf_max,
        type: 'column',
        name: 'Rainfall',
        color: '#d11919',
        tooltip: {
          valueSuffix: ' mm'
        }
      }, {
        data: result.forecast.rh_avg,
        type: 'spline',
        name: 'Relative Humidity',
        color: '#111919',
        tooltip: {
          valueSuffix: ' %'
        }
      }, {
        data: result.forecast.windgust_max,
        type: 'spline',
        name: 'Wind Gust',
        color: '#2288dd',
        tooltip: {
          valueSuffix: ' km/h'
        }
      }]
    };

    this.updateFlag = true;
  }

  

}
