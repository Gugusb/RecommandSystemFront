import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LoginDialogComponent} from "./login-dialog/login-dialog.component";
import {RegisterDialogComponent} from "./register-dialog/register-dialog.component";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  withCredentials: true
};

export interface userState{
  loginState:boolean;
  isAdminer:boolean;
  userId:number;
  userName:string;
}

export interface loginData{
  id:number;
  password:string;
}

export interface registerData{
  password:string;
  name:string;
  gender:number;
  age:number;
  occupation:number;
  zipnode:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userstate:userState = {
    loginState :false,
    isAdminer : false,
    userId : 0,
    userName : "UnLogin"
  };
  showFiller = false;
  panelOpenState = true;
  title = 'rs_front';
  myUrl = 'http://127.0.0.1:8037/user';
  constructor(private http : HttpClient, public dialog: MatDialog) {
    this.userstate = {
      loginState: false,
      isAdminer: false,
      userId: 0,
      userName: "UnLogin"
    }
  }

  userOpt(){
    if(this.userstate?.loginState == false){
      this.openLoginDialog();
    }else{
      this.openRegistDialog();
    }
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userLogin(result);
    });
  }

  openRegistDialog(): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userRegister(result);
    });
  }

  userLogin(logindata: loginData){
    this.http.post(this.myUrl + "/login",
      {"id": logindata.id, "password": logindata.password},
      httpOptions)
      .subscribe(
        (data) =>{
          // @ts-ignore
          if(data['status'] == 0){
            this.userstate.userId = logindata.id;
            this.userstate.loginState = true;
            this.userstate.userName = "用户" + logindata.id;
            if(logindata.id == 1){
              this.userstate.isAdminer = true;
            }
          }
        });
  }

  userRegister(regdata: registerData){
    console.log('Try regist with' + regdata.name + " and password " + regdata.password + "and" + regdata.gender);

    this.http.post(this.myUrl + "/register",
      regdata,
      httpOptions)
      .subscribe(
        (data) =>{
          // @ts-ignore
          if(data['status'] == 0){
            console.log("Register okk");
          }
        });
  }

  postData(){
    console.log("123");
    this.http.post(this.myUrl + "/login",
      {"id": 123, "password": 123456},
      httpOptions)
      .subscribe(
        function (data){
        console.log(data);
        });
  }
}
