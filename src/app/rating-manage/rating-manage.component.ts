import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {MovieWithGenre, Sort} from "../movie-home/movie-home.component";
import {PageEvent} from "@angular/material/paginator";

export interface Rating {
  id: number;
  userid: number;
  movieid: number;
  rating: number;
}

export interface SearchWay{
  value: string;
  name: string;
}

@Component({
  selector: 'app-rating-manage',
  templateUrl: './rating-manage.component.html',
  styleUrls: ['./rating-manage.component.css']
})
export class RatingManageComponent {
  pageIndex = 0;
  pageSize = 10;
  ratings : Rating[] = [];
  ratingCount : number = 0;
  pageEvent: any;

  targetId: any;
  re_targetId: number = 0;
  re_targetWay: number = 0;
  ways = new FormControl('ways');
  wayList: SearchWay[] = [
    {
      "name":"按电影ID查找",
      "value":"电影"
    },
    {
      "name":"按照用户ID查找",
      "value":"用户"
    }
  ];

  constructor() {
    this.targetId = 0;
    this.ratingCount = this.getRatingCount();
    this.ratings = this.getRatings(0, this.pageSize, -1, 0);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.ratings = this.getRatings(this.pageIndex, this.pageSize, -1, 0);
  }

  delete(id:number) {
    const newr: Rating[] = [];
    for (let r of this.ratings){
      if(r.id != id){
        newr.push(r);
      }
    }
    this.ratings = newr;
    return id;
  }

  search(){
    this.re_targetId = this.targetId;
    if(this.ways.value == "电影"){
      this.re_targetWay = 1;
    }
    else if(this.ways.value == "用户"){
      this.re_targetWay = 2;
    }
    else{
      this.re_targetWay = 0;
    }
    if(this.re_targetWay > 0 && this.re_targetId > 0){
      this.ratings = this.getRatings(this.pageIndex, this.pageSize, this.re_targetWay, this.re_targetId);
    }else{
      this.ratings = this.getRatings(this.pageIndex, this.pageSize, -1, 0);
    }

  }

  getRatingCount():number{
    return 100;
  }

  getRatings(index:number, size:number, way:number, tarId:number): Rating[]{
    return [
      {
        id: 1,
        userid: 106,
        movieid: 2065,
        rating: 5
      },
      {
        id: 2,
        userid: 106,
        movieid: 2065,
        rating: 4
      },
      {
        id: 3,
        userid: 106,
        movieid: 2065,
        rating: 5
      },
      {
        id: 4,
        userid: 106,
        movieid: 2065,
        rating: 2
      }
    ];
  }
}
