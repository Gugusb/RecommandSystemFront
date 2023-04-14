import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-movie-information',
  templateUrl: './movie-information.component.html',
  styleUrls: ['./movie-information.component.css']
})
export class MovieInformationComponent {
  movieId:number | null = null;
  movieName: string | null = null;
  movieGenre: string | null = null;
  ratingCount: number | null = null;
  ratings: number[] = [];

  initOpts = {
    renderer: 'svg',
    width: 300,
    height: 300
  };

  options: EChartsOption = {
    color: ['#3398DB'],
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
      data: [50, 15, 15, 10, 10]
    }]
  };

  mergeOptions: any;

  constructor(public route:ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((res)=>{
      this.movieId = res['id'];
      this.initMovieData(this.movieId);
    });
  }

  initMovieData(id: number | null){
    this.movieName = "MovieName";
    this.movieGenre = "戏剧、悬疑"
    this.ratingCount = 100;
    this.ratings = [50, 15, 15, 10, 10];
  }

}
