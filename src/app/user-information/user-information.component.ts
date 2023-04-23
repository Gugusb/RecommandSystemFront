import { Component } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  withCredentials: true
};

export interface MovieWithRate {
  name: string;
  rate: number;
  date: String;
}

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent {
  myUrl = 'http://127.0.0.1:8037/user';
  username : String;
  pageIndex = 0;
  pageSize = 10;
  shownMovies : any[] = [];
  movieCount : number = 0;
  pageEvent : any;

  constructor(private http : HttpClient) {
    this.username = this.getUserName();
    this.movieCount = this.getMovieCount();
    this.shownMovies = this.getMovies(0, this.pageSize);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.shownMovies = this.getMovies(this.pageIndex, this.pageSize);
  }

  getUserName(): String{
    let name = "";
    this.http.post(this.myUrl + "/get_user_name",
      {},
      httpOptions)
      .subscribe(
        (data) =>{
          // @ts-ignore
          name = data['data'];
          this.username = name;
        });
    return name;
  }

  getMovieCount():number{
    return 0;
  }

  getMovies(index:number, size:number): MovieWithRate[]{
    this.http.post(this.myUrl + "/get_user_ratings",
      {"id": 1},
      {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
        withCredentials: true,
        params: {
          "page": index,
          "size": size
        }
      })
      .subscribe(
        (data) =>{
          console.log(data);
          // @ts-ignore
          this.movieCount = data['data']['totalElements']
          // @ts-ignore
          for(let i = 0;i < data['data']['content'].length;i ++){
            this.shownMovies[i] = {
              // @ts-ignore
              rate:data['data']['content'][i]['rating'],
              name:"",
              // @ts-ignore
              date:this.timestampToTime(data['data']['content'][i]['timestamp'])
            }
          }
        });
    this.http.post(this.myUrl + "/get_user_ratingnames",
      {"id": 1},
      {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
        withCredentials: true,
        params: {
          "page": index,
          "size": size
        }
      })
      .subscribe(
        (data) =>{
          console.log(data);
          // @ts-ignore
          for(let i = 0;i < data['data'].length;i ++){
            // @ts-ignore
            this.shownMovies[i].name = data['data'][i];
          }
        });
    return [];
  }

  timestampToTime(timestamp: number):String {
    const date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const Y = date.getFullYear();
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    const D = date.getDate();
    return "" + Y + "/" + M + "/" + D;
  }
}
