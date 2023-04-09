import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {IndexRoutingModule} from "./index/index-routing.module";

const routes: Routes = [
  {
    path:'about',
    component:AboutComponent
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
