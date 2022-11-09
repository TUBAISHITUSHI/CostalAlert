import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenerelService } from '../../services/generel.service'
import * as L from 'leaflet';

@Component({
  selector: 'app-rainfall',
  templateUrl: './rainfall.component.html',
  styleUrls: ['./rainfall.component.css']
})
export class RainfallComponent implements OnInit, AfterViewInit{

  map:any;
  mapLayer:any;

  alert_value:any;
  selected_upazila = "Cox's Bazar";

  constructor(private http: HttpClient, private generelService: GenerelService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.intiMap();
  }

  intiMap():void {
    this.map = L.map('map', {
      center: [ 21.30, 92.10 ],
      zoom: 9
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.fetchAlertUpazila(2022, 1);
  }

  fetchAlertUpazila(district_id:any, param:any) {
    this.generelService.getUpazilaAlert(district_id, param).subscribe(response => {
      this.genMapShapeFile(response.result);
    }, error => {
      console.log(error);
    });
  }

  async genMapShapeFile(data_result:any) {
    await this.http.get<any>('assets/shape/2022.geojson').subscribe(data => {
      let that = this;
      this.mapLayer = L.geoJSON(data,{
        onEachFeature: function(feat,lyr){

          let d_name  = feat['properties']['admin2Name'];
          let u_name  = feat['properties']['admin3Name'];
          let d_code  = feat['properties']['admin2Pcod'];
          let u_code  = feat['properties']['admin3Pcod'];

          lyr.bindTooltip(u_name, {sticky:true});

          lyr.on({mouseover:function(e){
            //this.setStyle({fillColor:'red'})
          }});

          lyr.on({mouseout:function(e){
            //this.setStyle({fillColor:'green'});
          }});

          lyr.on({click: function(e) {
            that.selected_upazila = u_name;
            that.fetchUpazilaData(u_code, 1);
          }})

        },
        style: function(geoFeature:any):any{
          console.log(geoFeature);
          console.log(data_result);
          if(data_result[geoFeature?.properties.admin3Pcod  ].alert == 1) {
            return {
              fillOpacity:1,
              weight:0.5,
              fillColor: '#7BB31A',
              color: 'black',
              fillRule: 'inherit',
            }
          } else if(data_result[geoFeature?.properties.admin3Pcod].alert == 2) {
            return {
              fillOpacity:1,
              weight:0.5,
              fillColor: '#EEDB00',
              color: 'black',
              fillRule: 'inherit',
            }
          } else if(data_result[geoFeature?.properties.admin3Pcod].alert == 3) {
            return {
              fillOpacity:1,
              weight:0.5,
              fillColor: '#FFA500',
              color: 'black',
              fillRule: 'inherit',
            }
          } else if(data_result[geoFeature?.properties.admin3Pcod].alert == 4) {
            return {
              fillOpacity:1,
              weight:0.5,
              fillColor: '#B22222',
              color: 'black',
              fillRule: 'inherit',
            }
          } else {
            return{
              fillOpacity:0.7,
              weight:0.5,
              fillColor: 'black',
              color: 'black',
              fillRule: 'inherit',
            }
          }
        }
      }).addTo(this.map);

    });

    this.fetchUpazilaData(202224,1);
  }

  async fetchUpazilaData(upazila_id:any, param:any) {
    await this.generelService.getUpazilaValue(upazila_id, param).subscribe(response => {
      this.alert_value = response.result;
    }, error => {
      console.log(error);
    });
  }



}
