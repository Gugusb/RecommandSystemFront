import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";

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
  pageIndex = 0;
  pageSize = 10;
  shownTeams : logTeam[] = [];
  teamCount : number = 0;
  pageEvent: any;

  constructor(private route:ActivatedRoute) {
    this.teamCount = this.getTeamCount();
    this.shownTeams = this.getTeams(0, this.pageSize);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.shownTeams = this.getTeams(this.pageIndex, this.pageSize);
  }

  search(){
    this.shownTeams = this.getTeams(this.pageIndex, this.pageSize);
  }

  getTeamCount():number{
    return 0;
  }

  getTeams(index:number, size:number): logTeam[]{
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
    return "" + Y + "/" + M + "/" + D;
  }
}
