import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SubindexComponent} from "../subindex/subindex.component";

const routes: Routes = [
  {
    path:'sub',
    component:SubindexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
