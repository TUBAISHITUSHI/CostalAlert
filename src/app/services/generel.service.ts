import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenerelService {

  constructor(private http:HttpClient) { }

  getDistrictAlert(parameter:any) {
    return this.http.get<any>( environment.base_url_api + 'common/get_alert_district.php?parameter=' + parameter);
  }

  getUpazilaAlert(district:any, parameter:any) {
    return this.http.get<any>( environment.base_url_api + 'common/get_alert_upazila_2.php?district_id=' + district + '&parameter=' + parameter );
  }

  getUpazilaValue(upazila:any, parameter:any) {
    return this.http.get<any>( environment.base_url_api + 'common/get_alert_value.php?upazila_id=' + upazila + '&parameter=' + parameter );
  }
  
  getAlertCount() {
    return this.http.get<any>( environment.base_url_api + 'common/weather/get_alert_count.php');
  } 
  
  getLocationForecast(upazila_id:any) {
    return this.http.get<any>( environment.base_url_api + 'common/weather/get_forecast.php?upazila_id='+upazila_id);
  } 

}
