import { Component } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

export interface MovieWithGenre {
  id:number;
  name: string;
  rate: number;
  genre: String;
}

export interface Genre{
  value: number;
  name: String;
}

export interface Sort{
  value: number;
  name: String;
}

@Component({
  selector: 'app-movie-home',
  templateUrl: './movie-home.component.html',
  styleUrls: ['./movie-home.component.css']
})
export class MovieHomeComponent {
  myUrl = 'http://127.0.0.1:8037/movie';
  pageIndex = 0;
  pageSize = 10;
  shownMovies : MovieWithGenre[] = [];
  movieCount : number = 0;
  pageEvent: any;

  genres = new FormControl('genres');
  genreList: Genre[] = [
    {
      "name":"Action",
      "value":0
    },
    {
      "name":"Adventure",
      "value":1
    },
    {
      "name":"Animation",
      "value":2
    },
    {
      "name":"Children",
      "value":3
    },
    {
      "name":"Comedy",
      "value":4
    },
    {
      "name":"Crime",
      "value":5
    },
    {
      "name":"Documentary",
      "value":6
    },
    {
      "name":"Drama",
      "value":7
    },
    {
      "name":"Fantasy",
      "value":8
    },
    {
      "name":"FilmNoir",
      "value":9
    },
    {
      "name":"Horror",
      "value":10
    },
    {
      "name":"Musical",
      "value":11
    },
    {
      "name":"Mystery",
      "value":12
    },
    {
      "name":"Romance",
      "value":13
    },
    {
      "name":"SciFi",
      "value":14
    },
    {
      "name":"Thriller",
      "value":15
    },
    {
      "name":"War",
      "value":16
    },
    {
      "name":"Western",
      "value":17
    }
  ];

  sorts = new FormControl('sorts');
  sortList: Sort[] = [
    {
      "name":"按照ID正序",
      "value":0
    },
    {
      "name":"按照ID倒序",
      "value":1
    }
  ];

  constructor(private route:ActivatedRoute, private http : HttpClient) {
    this.getMovieCount();
    this.getMovies(0, this.pageSize);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.getMovies(this.pageIndex, this.pageSize);
  }

  search(){
    this.getMovieCount();
    this.getMovies(this.pageIndex, this.pageSize);
  }

  getMovieCount(){
    let tags:number[] = [];
    //构建tag数组
    for(let i = 0;i < 18;i ++){
      tags[i] = 0;
    }
    ///检查选项卡的Value值
    // @ts-ignore
    for(let i = 0;i < this.genres.value?.length;i ++){
      // @ts-ignore
      tags[this.genres.value[i]] = 1;
    }
    this.http.post(this.myUrl + "/search_movie_count",
      {"id": 1},
      {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
        withCredentials: true,
        params: {
          "page": 0,
          "size": 10,
          "tags": tags,
          // @ts-ignore
          "isAsc": this.sorts.value == 0
        }
      })
      .subscribe(
        (data) =>{
          console.log("count" + data);
          // @ts-ignore
          this.movieCount = data['data'];
        });
  }

  getMovies(index:number, size:number){
    let tags:number[] = [];
    //构建tag数组
    for(let i = 0;i < 18;i ++){
      tags[i] = 0;
    }
    ///检查选项卡的Value值
    // @ts-ignore
    for(let i = 0;i < this.genres.value?.length;i ++){
      // @ts-ignore
      tags[this.genres.value[i]] = 1;
    }
    this.http.post(this.myUrl + "/search_movie_inf",
      {"id": 1},
      {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
        withCredentials: true,
        params: {
          "page": index,
          "size": size,
          "tags": tags,
          // @ts-ignore
          "isAsc": this.sorts.value == 0
        }
      })
      .subscribe(
        (data) =>{
          console.log(data);
          // @ts-ignore
          for(let i = 0;i < data['data'].length;i ++){
            this.shownMovies[i] = {
              rate:4,
              // @ts-ignore
              name:data['data'][i]['title'],
              // @ts-ignore
              id:data['data'][i]['id'],
              // @ts-ignore
              genre:data['data'][i]['genres']
            }
          }
        });
  }

}
