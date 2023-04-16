import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LoginDialogComponent} from "./login-dialog/login-dialog.component";
import {RegisterDialogComponent} from "./register-dialog/register-dialog.component";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
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
  username:string;
  gender:number;
  age:number;
  occupation:number;
  zipcode:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userstate:userState | null = null;
  showFiller = false;
  panelOpenState = true;
  title = 'rs_front';
  myUrl = 'http://127.0.0.1:8036/user';
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
      this.userLogin(result);
    });
  }

  userLogin(logindata: loginData){
    // @ts-ignore
    this.userstate.loginState = true;
    // @ts-ignore
    this.userstate.userName = "Gugusb";
    // @ts-ignore
    this.userstate.isAdminer = true;

    console.log('Try login with' + logindata.id + " and password " + logindata.password);
  }

  userRegister(regdata: registerData){

    console.log('Try regist with' + regdata.username + " and password " + regdata.password);
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
