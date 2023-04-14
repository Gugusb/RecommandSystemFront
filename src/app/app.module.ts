import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { EchartsComponent } from './echarts/echarts.component';
import { NgxEchartsModule } from 'ngx-echarts';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import { UserInformationComponent } from './user-information/user-information.component';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatPaginatorModule} from "@angular/material/paginator";
import { MovieHomeComponent } from './movie-home/movie-home.component';
import {MatSelectModule} from "@angular/material/select";
import { RatingManageComponent } from './rating-manage/rating-manage.component';
import { MovieManageComponent } from './movie-manage/movie-manage.component';
import { MovieInformationComponent } from './movie-information/movie-information.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    EchartsComponent,
    UserInformationComponent,
    MovieHomeComponent,
    RatingManageComponent,
    MovieManageComponent,
    MovieInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatExpansionModule,
    MatCardModule,
    MatListModule,
    MatPaginatorModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
