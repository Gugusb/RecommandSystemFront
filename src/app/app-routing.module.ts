import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {IndexRoutingModule} from "./index/index-routing.module";
import {UserInformationComponent} from "./user-information/user-information.component";
import {MovieHomeComponent} from "./movie-home/movie-home.component";
import {RatingManageComponent} from "./rating-manage/rating-manage.component";
import {MovieManageComponent} from "./movie-manage/movie-manage.component";
import {MovieInformationComponent} from "./movie-information/movie-information.component";
import {MovieRecommendComponent} from "./movie-recommend/movie-recommend.component";

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
    path:'rating-manage',
    component:RatingManageComponent
  },
  {
    path:'movie-manage',
    component:MovieManageComponent
  },
  {
    path:'movie-information',
    component:MovieInformationComponent
  },
  {
    path:'movie-recommend',
    component:MovieRecommendComponent
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
