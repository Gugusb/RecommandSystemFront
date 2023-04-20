import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EChartsOption} from "echarts";

export interface algLog{
  logno:number;
  userid:number;
  algtype:number;
  recall:number;
  precision:number;
  accuracy:number;
}

@Component({
  selector: 'app-log-information',
  templateUrl: './log-information.component.html',
  styleUrls: ['./log-information.component.css']
})
export class LogInformationComponent {
  teamid:number|null = null;
  teamno:number|null = null;
  users:number[] = [];
  algtypes:number[] = [];
  isCompensate:boolean = false;
  divRate:number|null = null;
  date:string = "";
  logs:algLog[] = [];

  //图标1
  options_1: EChartsOption = {
    legend: {},
    tooltip: {},
    xAxis: { type: 'category' },
    yAxis: {},
    series: [{ type: 'bar' }]
  };
  mergeOptions_1: any;
  mergeOptions_2: any;
  mergeOptions_3: any;
  mergeOptions_4: any;

  resetData_1() {
    this.mergeOptions_1 = {
      dataset: {
        source: this.createDataForRecall()
      },
      series: this.getSeries(this.algtypes.length)
    }
  }

  resetData_2() {
    this.mergeOptions_2 = {
      dataset: {
        source: this.createDataForPrecision()
      },
      series: this.getSeries(this.algtypes.length)
    }
  }

  resetData_3() {
    this.mergeOptions_3 = {
      dataset: {
        source: this.createDataForAccuracy()
      },
      series: this.getSeries(this.algtypes.length)
    }
  }

  resetData_4() {
    this.mergeOptions_4 = {
      dataset: {
        source: this.createDataForSum()
      },
      series: this.getSeries(this.algtypes.length)
    }
  }

  getSeries(count:number){
    let res:any[] = [];
    for(let i = 0;i < count;i ++){
      res.push({
        type: 'bar'
      });
    }
    return res;
  }

  createDataForRecall(){
    let res: any[] = [];
    //第一行
    let one: string[] = [];
    one.push('算法');
    for(let i = 0;i < this.algtypes.length;i ++){
      let algno = this.algtypes[i];
      if(algno == 1){
        one.push('基于内容的推荐算法');
        continue;
      }
      if(algno == 2){
        one.push('基于用户的协同过滤算法');
        continue;
      }
      if(algno == 3){
        one.push('基于物品的协同过滤算法');
        continue;
      }
      // @ts-ignore
      if(algno == 4){
        one.push('混合算法1');
        continue;
      }
    }
    res.push(one);
    //数据行
    for(let i = 0;i < this.users.length;i ++){
      let a : any[] = [];
      let userid = this.users[i];
      a.push('用户' + userid);
      for(let j = 0;j < this.algtypes.length;j ++){
        let algtype = this.algtypes[j];
        a.push(this.getRPA(userid, algtype)[0]);
      }
      res.push(a);
    }
    return res;
  }

  createDataForPrecision(){
    let res: any[] = [];
    //第一行
    let one: string[] = [];
    one.push('算法');
    for(let i = 0;i < this.algtypes.length;i ++){
      let algno = this.algtypes[i];
      if(algno == 1){
        one.push('基于内容的推荐算法');
        continue;
      }
      if(algno == 2){
        one.push('基于用户的协同过滤算法');
        continue;
      }
      if(algno == 3){
        one.push('基于物品的协同过滤算法');
        continue;
      }
      // @ts-ignore
      if(algno == 4){
        one.push('混合算法1');
        continue;
      }
    }
    res.push(one);
    //数据行
    for(let i = 0;i < this.users.length;i ++){
      let a : any[] = [];
      let userid = this.users[i];
      a.push('用户' + userid);
      for(let j = 0;j < this.algtypes.length;j ++){
        let algtype = this.algtypes[j];
        a.push(this.getRPA(userid, algtype)[1]);
      }
      res.push(a);
    }
    return res;
  }

  createDataForAccuracy(){
    let res: any[] = [];
    //第一行
    let one: string[] = [];
    one.push('算法');
    for(let i = 0;i < this.algtypes.length;i ++){
      let algno = this.algtypes[i];
      if(algno == 1){
        one.push('基于内容的推荐算法');
        continue;
      }
      if(algno == 2){
        one.push('基于用户的协同过滤算法');
        continue;
      }
      if(algno == 3){
        one.push('基于物品的协同过滤算法');
        continue;
      }
      // @ts-ignore
      if(algno == 4){
        one.push('混合算法1');
        continue;
      }
    }
    res.push(one);
    //数据行
    for(let i = 0;i < this.users.length;i ++){
      let a : any[] = [];
      let userid = this.users[i];
      a.push('用户' + userid);
      for(let j = 0;j < this.algtypes.length;j ++){
        let algtype = this.algtypes[j];
        a.push(this.getRPA(userid, algtype)[2]);
      }
      res.push(a);
    }
    return res;
  }

  createDataForSum(){
    let res: any[] = [];
    //第一行
    let one: string[] = [];
    one.push('算法');
    for(let i = 0;i < this.algtypes.length;i ++){
      let algno = this.algtypes[i];
      if(algno == 1){
        one.push('基于内容的推荐算法');
        continue;
      }
      if(algno == 2){
        one.push('基于用户的协同过滤算法');
        continue;
      }
      if(algno == 3){
        one.push('基于物品的协同过滤算法');
        continue;
      }
      // @ts-ignore
      if(algno == 4){
        one.push('混合算法1');
        continue;
      }
    }
    res.push(one);
    //数据行-召回率
    let a : any[] = [];
    a.push('召回率');
    for(let i = 0;i < this.algtypes.length;i ++){
      let algtype = this.algtypes[i];
      a.push(this.getRorPorA(algtype, 1));
    }
    res.push(a);
    //数据行-精确率
    let b : any[] = [];
    b.push('精确率');
    for(let i = 0;i < this.algtypes.length;i ++){
      let algtype = this.algtypes[i];
      b.push(this.getRorPorA(algtype, 2));
    }
    res.push(b);
    //数据行-正确率
    let c : any[] = [];
    c.push('正确率');
    for(let i = 0;i < this.algtypes.length;i ++){
      let algtype = this.algtypes[i];
      c.push(this.getRorPorA(algtype, 3));
    }
    res.push(c);
    return res;
  }

  getRorPorA(algtype:number, rpaNo:number){
    let sum = 0;
    let c = 0;
    for (let i = 0; i < this.logs.length; i++) {
      let alg = this.logs[i];
      if(alg.algtype == algtype){
        c ++;
        if(rpaNo == 1){
          sum += alg.recall;
        }else if(rpaNo == 2){
          sum += alg.precision;
        }else{
          sum += alg.accuracy;
        }
      }
    }
    if(c == 0){
      return 0;
    }
    return sum / c;
  }

  getRPA(userid:number, algtype:number):number[]{
    let res: number[] = [];
    for (let i = 0; i < this.logs.length; i++) {
      let alg = this.logs[i];
      if (alg.userid == userid && alg.algtype == algtype) {
        res.push(alg.recall);
        res.push(alg.precision);
        res.push(alg.accuracy);
      }
    }
    return res;
  }

  constructor(public route:ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((res)=>{
      this.teamid = res['id'];
      this.logs = this.getLogs();
      this.getLogTeamInf();
      console.log(this.createDataForRecall())
      this.resetData_1();
      this.resetData_2();
      this.resetData_3();
      this.resetData_4();
    });
  }

  getLogTeamInf(){
    this.teamno = 165;
    this.users = [1, 2, 3, 4, 5];
    this.algtypes = [1, 2, 3, 4];
    this.isCompensate = true;
    this.divRate = 0.8;
    this.date = this.timestampToTime(123456789111);
  }

  getLogs():algLog[]{
    let res:any[] = [];
    let count = 0;
    for(let i = 1;i <= 5;i ++){
      for(let j = 1;j <= 4;j ++){
        count ++;
        res.push({
          logno:count,
          userid:i,
          algtype:j,
          recall:Math.random(),
          precision:Math.random(),
          accuracy:Math.random(),
        });
      }
    }
    return res;
  }

  timestampToTime(timestamp: number):string {
    const date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const Y = date.getFullYear();
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    const D = date.getDate();
    return "" + Y + "/" + M + "/" + D;
  }
}
