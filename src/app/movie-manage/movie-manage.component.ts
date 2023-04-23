import { Component } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MovieDialogComponent} from "../movie-dialog/movie-dialog.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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
  myUrl = 'http://127.0.0.1:8037/movie';
  pageIndex = 0;
  pageSize = 10;
  movies : MovieInf[] = [];
  movieCount : number = 0;
  targetId: any;
  pageEvent: any;

  constructor(public dialog: MatDialog, private http : HttpClient) {
    this.getMovies(0, this.pageSize, -1);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.getMovies(this.pageIndex, this.pageSize, -1);
  }

  delete(id:number) {
    const newr: MovieInf[] = [];
    for (let r of this.movies){
      if(r.id != id){
        newr.push(r);
      }
    }
    this.movies = newr;
    this.http.post(this.myUrl + "/delete_movie",
      {"id": 1},
      {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
        withCredentials: true,
        params: {
          "movieId": id
        }
      })
      .subscribe(
        (data) =>{
          console.log(data);
        });
    return id;
  }

  search(){
    this.getMovies(0, this.pageSize, this.targetId);
  }

  manage(movieinf:MovieInf){
    const dialogRef = this.dialog.open(MovieDialogComponent, {
      data: movieinf,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result != null){
        this.updateData(result);
        for(let i = 0;i < this.movies.length;i ++){
          if(this.movies[i].id == movieinf.id){
            this.movies[i].name = result['name'];
            this.movies[i].genres = result['genres'];
            break;
          }
        }
      }
    });
  }

  updateData(data:any){
    if(data['genres'].length == 0){
      data['genres'] = [-1];
    }
    if(data['name'] == null){
      data['name'] = "null";
    }
    this.http.post(this.myUrl + "/change_movie_inf",
      {"id": 1},
      {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
        withCredentials: true,
        params: {
          "movieId": data['id'],
          "newName": data['name'],
          "newGenres": data['genres']
        }
      })
      .subscribe(
        (data) =>{
          console.log(data);
        });
  }

  getMovies(index:number, size:number, tarId:number){

    if(tarId == null){
      tarId = 0;
    }
    console.log(tarId)
    this.http.post(this.myUrl + "/search_movies",
      {"id": 1},
      {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
        withCredentials: true,
        params: {
          "page": index,
          "size": size,
          "movieId": tarId
        }
      })
      .subscribe(
        (data) =>{
          console.log(data);
          this.movies = [];
          // @ts-ignore
          this.movieCount = data['data']['totalElements'];
          // @ts-ignore
          for(let i = 0;i < data['data']['content'].length;i ++){
            this.movies[i] = {
              // @ts-ignore
              name:data['data']['content'][i]['title'],
              // @ts-ignore
              id:data['data']['content'][i]['id'],
              // @ts-ignore
              genres:data['data']['content'][i]['genres']
            }
          }

        });
  }
}
