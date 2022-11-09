import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ColdwaveComponent } from './components/coldwave/coldwave.component';
import { HeatwaveComponent } from './components/heatwave/heatwave.component';
import { HomeComponent } from './components/home/home.component';
import { RainfallComponent } from './components/rainfall/rainfall.component';
import { WindgustComponent } from './components/windgust/windgust.component';

const routes: Routes = [{
    path: "",
    pathMatch: "full",
    redirectTo: "home"
  }, {
    path: "home",
    component: HomeComponent
  }, {
    path: "rainfall",
    component: RainfallComponent
  }, {
    path: "windgust",
    component: WindgustComponent
  }, {
    path: "heatwave",
    component: HeatwaveComponent
  }, {
    path: "coldwave",
    component: ColdwaveComponent
  }, {
    path: "about",
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
