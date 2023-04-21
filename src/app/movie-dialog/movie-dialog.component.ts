import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {number} from "echarts/core";
import {MatChipInputEvent} from "@angular/material/chips";
import {HttpClient, HttpHeaders} from "@angular/common/http";

export interface MovieInf{
  id: number;
  name: string;
  genres: number[];
}

@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.css']
})
export class MovieDialogComponent {
  myUrl = 'http://127.0.0.1:8037/movie';
  s = [
    {id:1,name:"Action"},
    {id:2,name:"Adventure"},
    {id:3,name:"Animation"},
    {id:4,name:"Children"},
    {id:5,name:"Comedy"},
    {id:6,name:"Crime"},
    {id:7,name:"Documentary"},
    {id:8,name:"Drama"},
    {id:9,name:"Fantasy"},
    {id:10,name:"FilmNoir"},
    {id:11,name:"Horror"},
    {id:12,name:"Musical"},
    {id:13,name:"Mystery"},
    {id:14,name:"Romance"},
    {id:15,name:"SciFi"},
    {id:16,name:"Thriller"},
    {id:17,name:"War"},
    {id:18,name:"Western"},
  ];
  movieinf:MovieInf = {
    id : 0,
    name : "",
    genres : []
  }
  formControl_step1 = new FormControl(['genres']);


  constructor(
    private http : HttpClient,
    public dialogRef: MatDialogRef<MovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(data);
    this.movieinf.id = data['id'];
    this.movieinf.name = data['name'];
    this.getGenres();
  }

  getGenres(){
    this.http.post(this.myUrl + "/get_movie_genres",
      {"id": 1},
      {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
        withCredentials: true,
        params: {
          "movieId": this.movieinf.id
        }
      })
      .subscribe(
        (data) =>{
          console.log(data);
          // @ts-ignore
          this.movieinf.genres = data['data'];
        });
  }

  getGnereName(genreid:number){
    return this.s[genreid - 1].name;
  }

  removeKeyword(keyword: number) {
    const index = this.movieinf.genres.indexOf(keyword);
    if (index >= 0) {
      this.movieinf.genres.splice(index, 1);
    }
  }

  add(id:number): void {
    this.movieinf.genres.push(Number(id));
  }
}
