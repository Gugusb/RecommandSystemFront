import { Component } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";

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
  username : String;
  pageIndex = 0;
  pageSize = 10;
  shownMovies : MovieWithRate[] = [];
  movieCount : number = 0;
  pageEvent : any;

  constructor() {
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
    return "Gugusb";
  }

  getMovieCount():number{
    return 0;
  }

  getMovies(index:number, size:number): MovieWithRate[]{
    return [];
  }

  timestampToTime(timestamp: number):String {
    const date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const Y = date.getFullYear();
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    const D = date.getDate();
    return "" + Y + "/" + M + "/" + D;
  }
}
