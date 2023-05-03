import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from './app.component';
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
import {MatChipsModule} from "@angular/material/chips";
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import { MovieRecommendComponent } from './movie-recommend/movie-recommend.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { LogViewComponent } from './log-view/log-view.component';
import { LogInformationComponent } from './log-information/log-information.component';
import { MovieDialogComponent } from './movie-dialog/movie-dialog.component';
import {MatMenuModule} from "@angular/material/menu";
import { RatingDialogComponent } from './rating-dialog/rating-dialog.component';
import { ExitDialogComponent } from './exit-dialog/exit-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    EchartsComponent,
    UserInformationComponent,
    MovieHomeComponent,
    RatingManageComponent,
    MovieManageComponent,
    MovieInformationComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    LogoutDialogComponent,
    MovieRecommendComponent,
    LogViewComponent,
    LogInformationComponent,
    MovieDialogComponent,
    RatingDialogComponent,
    ExitDialogComponent
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
    ReactiveFormsModule,
    MatChipsModule,
    MatDialogModule,
    MatStepperModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
