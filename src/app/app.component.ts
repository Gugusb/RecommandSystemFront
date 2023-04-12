import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAdminer = true;
  showFiller = false;
  panelOpenState = true;
  title = 'rs_front';
  myUrl = 'http://127.0.0.1:8036/user';
  constructor(private http : HttpClient) {
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
