import { Component } from '@angular/core';
import {MovieWithRate} from "../user-information/user-information.component";
import {PageEvent} from "@angular/material/paginator";
import {FormControl} from "@angular/forms";

export interface MovieWithGenre {
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
  pageIndex = 0;
  pageSize = 10;
  shownMovies : MovieWithGenre[] = [];
  movieCount : number = 0;
  pageEvent: any;

  genres = new FormControl('genres');
  genreList: Genre[] = [
    {
      "name":"种类1",
      "value":1
    },
    {
      "name":"种类2",
      "value":2
    },
    {
      "name":"种类3",
      "value":3
    },
    {
      "name":"种类4",
      "value":4
    },
    {
      "name":"种类5",
      "value":5
    }
  ];

  sorts = new FormControl('sorts');
  sortList: Sort[] = [
    {
      "name":"种类1",
      "value":1
    },
    {
      "name":"种类2",
      "value":2
    },
    {
      "name":"种类3",
      "value":3
    },
    {
      "name":"种类4",
      "value":4
    },
    {
      "name":"种类5",
      "value":5
    }
  ];

  constructor() {
    this.movieCount = this.getMovieCount();
    this.shownMovies = this.getMovies(0, this.pageSize);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.shownMovies = this.getMovies(this.pageIndex, this.pageSize);
  }

  search(){
    this.shownMovies = this.getMovies(this.pageIndex, this.pageSize);
  }

  getMovieCount():number{
    return 0;
  }

  getMovies(index:number, size:number): MovieWithGenre[]{
    return [];
  }
}