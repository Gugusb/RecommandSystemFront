import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {HttpClient, HttpHeaders} from "@angular/common/http";

export interface logTeam{
  id:number;
  teamno:number;
  date:string;
  usercount:number;
  algcount:number;
}

@Component({
  selector: 'app-log-view',
  templateUrl: './log-view.component.html',
  styleUrls: ['./log-view.component.css']
})
export class LogViewComponent {
  myUrl = 'http://127.0.0.1:8037/log';
  pageIndex = 0;
  pageSize = 10;
  shownTeams : logTeam[] = [];
  teamCount : number = 0;
  pageEvent: any;

  constructor(private route:ActivatedRoute, private http : HttpClient) {
    this.getTeams(0, this.pageSize);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.getTeams(this.pageIndex, this.pageSize);
  }

  search(){
    this.getTeams(this.pageIndex, this.pageSize);
  }

  getTeamCount():number{
    return 0;
  }

  getTeams(index:number, size:number): logTeam[]{
    this.http.post(this.myUrl + "/get_all_logteams",
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
          this.teamCount = data['data']['totalElements'];
          this.shownTeams = [];
          // @ts-ignore
          for(let i = 0;i < data['data']['content'].length;i ++){
            this.shownTeams.push({
              // @ts-ignore
              id:data['data']['content'][i]['id'],
              // @ts-ignore
              teamno:data['data']['content'][i]['teamno'],
              // @ts-ignore
              date: this.timestampToTime(data['data']['content'][i]['time']),
              // @ts-ignore
              usercount:data['data']['content'][i]['usercount'],
              // @ts-ignore
              algcount:data['data']['content'][i]['algCount'],
            });
          }
        });
    return [
      {
        id:1,
        teamno:1,
        date: this.timestampToTime(119234569890),
        usercount:2,
        algcount:3,
      },
      {
        id:2,
        teamno:2,
        date:this.timestampToTime(221239567890),
        usercount:2,
        algcount:3,
      },
      {
        id:3,
        teamno:3,
        date:this.timestampToTime(331234267990),
        usercount:2,
        algcount:3,
      },
    ];
  }

  timestampToTime(timestamp: number):string {
    const date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const Y = date.getFullYear();
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    const D = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const second = date.getSeconds();
    return "" + Y + "/" + M + "/" + D + " " + hours + ":" + minutes + ":" + second;
  }
}
