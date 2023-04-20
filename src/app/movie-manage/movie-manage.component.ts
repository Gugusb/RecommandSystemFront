import { Component } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MovieDialogComponent} from "../movie-dialog/movie-dialog.component";

export interface Movie {
  id: number;
  name: string;
}

export interface MovieInf{
  id: number;
  name: string;
  genres: number[];
}

@Component({
  selector: 'app-movie-manage',
  templateUrl: './movie-manage.component.html',
  styleUrls: ['./movie-manage.component.css']
})
export class MovieManageComponent {
  pageIndex = 0;
  pageSize = 10;
  movies : Movie[] = [];
  movieCount : number = 0;
  targetId: any;
  pageEvent: any;

  constructor(public dialog: MatDialog) {
    this.movieCount = this.getMovieCount();
    this.movies = this.getMovies(0, this.pageSize, -1);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.movies = this.getMovies(this.pageIndex, this.pageSize, -1);
  }

  delete(id:number) {
    const newr: Movie[] = [];
    for (let r of this.movies){
      if(r.id != id){
        newr.push(r);
      }
    }
    this.movies = newr;
    return id;
  }

  search(){
    this.movies = this.getMovies(0, this.pageSize, this.targetId);
  }

  manage(id:number){
    let movieinf = this.getMovieById(id);
    const dialogRef = this.dialog.open(MovieDialogComponent, {
      data: movieinf,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  getMovieCount():number{
    return 100;
  }

  getMovieById(id:number){
    return {
      id:id,
      name:"MovieSoCool",
      genres:[1, 2, 5, 11]
    };
  }

  getMovies(index:number, size:number, tarId:number): Movie[]{
    return [
      {
        id: 1,
        name: "Movie1"
      },
      {
        id: 2,
        name: "Movie2"
      },
      {
        id: 3,
        name: "Movie3"
      },
      {
        id: 4523,
        name: "Movie4"
      }
    ];
  }
}
