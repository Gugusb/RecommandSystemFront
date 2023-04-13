import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {IndexRoutingModule} from "./index/index-routing.module";
import {UserInformationComponent} from "./user-information/user-information.component";
import {MovieHomeComponent} from "./movie-home/movie-home.component";

const routes: Routes = [
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'user-information',
    component:UserInformationComponent
  },
  {
    path:'movie-home',
    component:MovieHomeComponent
  },
  {
    path:'index',
    loadChildren:()=>import('./index/index.module').then(m=>IndexRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
