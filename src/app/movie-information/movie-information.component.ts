import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { EChartsOption } from 'echarts';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {RatingDialogComponent} from "../rating-dialog/rating-dialog.component";

@Component({
  selector: 'app-movie-information',
  templateUrl: './movie-information.component.html',
  styleUrls: ['./movie-information.component.css']
})
export class MovieInformationComponent {
  myUrl = 'http://127.0.0.1:8037/movie';
  movieId:any = null;
  movieName: string | null = null;
  movieGenre: string | null = null;
  ratingCount: number = 0;
  ratings: number[] = [];
  score: string = "5.0";
  echartsInst: any;
  ratingMessage:string = "你尚未评价过此电影";
  userRating:number = 0;
  initOpts = {
    renderer: 'svg',
    width: 300,
    height: 300
  };

  options: EChartsOption = {
    color: ['#cb2579'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['5分', '4分', '3分', '2分', '1分'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: '评分人数',
      type: 'bar',
      barWidth: '40%',
      data: [57, 37, 26, 3, 31]
    }]
  };

  constructor(public route:ActivatedRoute, private http : HttpClient, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((res)=>{
      this.movieId = res['id'];
      this.movieName = res['name'];
      this.movieGenre = res['genre'];
      this.initMovieData(this.movieId);
      this.initRatingData(this.movieId);
    });
  }

  openRatingDialog(): void {
    if(this.userRating == -2){
      return;
    }
    const dialogRef = this.dialog.open(RatingDialogComponent, {
      data: this.userRating,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        this.changeRating(result);
      }
    });
  }

  changeRating(data: any){
    console.log(data);
    this.ratings[data - 1] --;
    if(this.userRating > 0){
      this.ratings[this.userRating - 1] ++;
    }
    // @ts-ignore
    this.options.series[0].data = this.ratings;
    this.echartsInst.setOption(this.options);
    this.userRating = data;
    this.ratingMessage = "您对该电影的评价是" + this.userRating + "分";
    this.http.post("http://127.0.0.1:8037/user" + "/change_rating",
      {"id": 1},
      {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
        withCredentials: true,
        params: {
          "movieid": this.movieId,
          "rating": this.userRating
        }
      })
      .subscribe(
        (data) =>{
          console.log(data);
        });
  }

  initRatingData(id: number){
    if(id == null || id == 0){
      this.userRating = -2;
    }else{
      this.http.post("http://127.0.0.1:8037/ratings" + "/check_rating",
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
            // @ts-ignore
            this.userRating = data['data'];
            if(this.userRating == -2){
              this.ratingMessage = "用户尚未登录，登陆后可以使用评分功能";
            }
            if(this.userRating == -1){
              this.ratingMessage = "您尚未对该电影进行评分";
            }
            if(this.userRating >= 0){
              this.ratingMessage = "您对该电影的评价是" + this.userRating + "分";
            }
          });
    }
  }

  initMovieData(id: number):void{
    if(id == null || id == 0){
      this.ratings = [57, 37, 26, 3, 31];
      let s: number = 0;
      for(let i = 0;i < 5;i ++){
        s += (5 - i) * (this.ratings[i]);
        this.ratingCount += this.ratings[i];
      }
      this.score = (s / this.ratingCount).toFixed(1);
      return;
    }
    this.http.post(this.myUrl + "/search_movie_ratings",
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
          this.ratings = [];
          // @ts-ignore
          for(let i = 0;i < 5;i ++){
            // @ts-ignore
            this.ratings.push(data['data'][i]);
          }
          console.log(this.ratings);
          let s: number = 0;
          for(let i = 0;i < 5;i ++){
            s += (5 - i) * (this.ratings[i]);
            this.ratingCount += this.ratings[i];
          }
          this.score = (s / this.ratingCount).toFixed(1);
          // @ts-ignore
          this.options.series[0].data = this.ratings;
          this.echartsInst.setOption(this.options);
        });
  }

  onChartInit(ec: any){
    this.echartsInst = ec;
  }

  changeData(){
    // @ts-ignore
    this.options.series[0].data = [57, 37, 26, Math.random() * 100, 31];
    this.echartsInst.setOption(this.options);
    console.log(this.echartsInst);
  }

}
