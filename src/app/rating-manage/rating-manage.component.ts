import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {MovieWithGenre, Sort} from "../movie-home/movie-home.component";
import {PageEvent} from "@angular/material/paginator";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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
  myUrl = 'http://127.0.0.1:8037/ratings';
  pageIndex = 0;
  pageSize = 10;
  ratings : Rating[] = [];
  ratingCount : number = 0;
  pageEvent: any;

  targetId: any;
  re_targetId: number = 0;
  re_targetWay: number = -1;
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

  constructor(private http : HttpClient) {
    this.targetId = 0;
    this.getRatingCount(-1, 0);
    this.getRatings(0, this.pageSize, -1, 0);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.getRatings(this.pageIndex, this.pageSize, this.re_targetWay, this.re_targetId);
  }

  delete(id:number) {
    const newr: Rating[] = [];
    for (let r of this.ratings){
      if(r.id != id){
        newr.push(r);
      }
    }
    this.ratings = newr;
    this.http.post(this.myUrl + "/delete_rating",
      {"id": 1},
      {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
        withCredentials: true,
        params: {
          "ratingId": id
        }
      })
      .subscribe(
        (data) =>{
          console.log(data)
        });
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
      this.getRatingCount(this.re_targetWay, this.re_targetId);
      this.getRatings(this.pageIndex, this.pageSize, this.re_targetWay, this.re_targetId);
    }else{
      this.getRatingCount(-1, 0);
      this.getRatings(this.pageIndex, this.pageSize, -1, 0);
    }

  }

  getRatingCount(way:number, tarId:number){
    this.http.post(this.myUrl + "/get_rating_count",
      {"id": 1},
      {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
        withCredentials: true,
        params: {
          "tar_way": way,
          "tar_id": tarId,
          "page": 0,
          "size": 10
        }
      })
      .subscribe(
        (data) =>{
          console.log("count" + data);
          // @ts-ignore
          this.ratingCount = data['data'];
        });
  }

  getRatings(index:number, size:number, way:number, tarId:number){
    if(tarId == null || way == null){
      way = -1;
      tarId = 0;
    }
    this.http.post(this.myUrl + "/get_ratings",
      {"id": 1},
      {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
        withCredentials: true,
        params: {
          "tar_way": way,
          "tar_id": tarId,
          "page": index,
          "size": size
        }
      })
      .subscribe(
        (data) =>{
          console.log(data)
          this.ratings = [];
          // @ts-ignore
          for(let i = 0;i < data['data']['content'].length;i ++){
            this.ratings.push({
              // @ts-ignore
              id: data['data']['content'][i]['id'],
              // @ts-ignore
              userid: data['data']['content'][i]['userid'],
              // @ts-ignore
              movieid: data['data']['content'][i]['movieid'],
              // @ts-ignore
              rating: data['data']['content'][i]['rating']
            });
          }
          console.log(this.ratings);
        });
  }
}
