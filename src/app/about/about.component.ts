import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl} from "@angular/forms";
import {MyHttpClient} from "../htttp/MyHttpClient";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{
  ngOnInit(): void {
    console.log('about init');
  }
  constructor() {
  }
  count:number = 1;
  isShow = true;
  arrays:number[] = [];
  addCount():void {
    this.count++;
    this.arrays.push(this.count);
    this.isShow=!this.isShow;
    console.log(this.count);

  }
}
