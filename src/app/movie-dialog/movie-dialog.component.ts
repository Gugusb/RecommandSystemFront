import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {number} from "echarts/core";
import {MatChipInputEvent} from "@angular/material/chips";

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
  s = [
    {id:1,name:"L1"},
    {id:2,name:"L2"},
    {id:3,name:"L3"},
    {id:4,name:"L4"},
    {id:5,name:"L5"},
    {id:6,name:"L6"},
    {id:7,name:"L7"},
    {id:8,name:"L8"},
    {id:9,name:"L9"},
    {id:10,name:"L10"},
    {id:11,name:"L11"},
    {id:12,name:"L12"},
    {id:13,name:"L13"},
  ];
  movieinf:MovieInf = {
    id : 0,
    name : "",
    genres : []
  }
  formControl_step1 = new FormControl(['genres']);


  constructor(
    public dialogRef: MatDialogRef<MovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(data);
    this.movieinf.id = data['id'];
    this.movieinf.name = data['name'];
    this.movieinf.genres = data['genres'];
  }

  getGnereName(genreid:number){
    let s = ["None", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "L10", "L11", "L12", "L13",];
    return s[genreid];
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
