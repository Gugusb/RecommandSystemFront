import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { EChartsOption } from 'echarts';
import {HttpClient, HttpHeaders} from "@angular/common/http";

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

  constructor(public route:ActivatedRoute, private http : HttpClient) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((res)=>{
      this.movieId = res['id'];
      this.movieName = res['name'];
      this.movieGenre = res['genre'];
      this.initMovieData(this.movieId);
    });
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
          console.log(data);
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
