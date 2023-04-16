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
    this.ratingCount = 0;
    this.ratings = [57, 37, 26, 3, 31];
    let s: number = 0;
    for(let i = 0;i < 5;i ++){
      s += (5 - i) * (this.ratings[i]);
      this.ratingCount += this.ratings[i];
    }
    this.score = (s / this.ratingCount).toFixed(1);
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
