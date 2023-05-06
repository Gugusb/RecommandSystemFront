import { Component } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatChipInputEvent} from '@angular/material/chips';
import {AppComponent} from "../app.component";
import {ActivatedRoute} from "@angular/router";
import {number} from "echarts/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

export interface userState{
  loginState:boolean;
  isAdminer:boolean;
  userId:number;
  userName:string;
}

export interface recommendMovie{
  id:number;
  name:string;
  rate:number;
}

@Component({
  selector: 'app-movie-recommend',
  templateUrl: './movie-recommend.component.html',
  styleUrls: ['./movie-recommend.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ]
})
export class MovieRecommendComponent {
  myUrl = 'http://127.0.0.1:8037/recommend';
  keywords = [1];
  isEditable:boolean = true;
  formControl_step1 = new FormControl({value: ['userid'], disabled : true});
  formControl_step4 = new FormControl({value: false, disabled : true});
  isAdminer:boolean = false;
  userId:number = 0;
  rate:number = 0.8;
  isStart:boolean = false;
  isFinish:boolean = false;
  otherRes:boolean = false;
  isNewUser = false;
  otherres = "";
  shownMovies:recommendMovie[] = [];
  timer:any;

  //新人选择标签
  formControl_tags = new FormControl(['genres']);
  genres = []

  toppings = this._formBuilder.group({
    alg1: {value: true, disabled: true},
    alg2: false,
    alg3: false,
    alg4: false,
  });

  startRecommend(){
    this.isStart = true;
    this.isEditable = false;
    this.isFinish = false;
    this.timer = setInterval(()=>{
      this.finishRecommend();
    }, 1000 * 3);
  }

  finishRecommend(){
    console.log("time finish");
    clearInterval(this.timer);
    this.timer = null;
    this.getRecommendMovie();
  }

  getRecommendMovie():recommendMovie[]{
    //用户ID
    let users = this.keywords;
    //电影类型
    let algs = [this.toppings.controls.alg1.value, this.toppings.controls.alg2.value, this.toppings.controls.alg3.value, this.toppings.controls.alg4.value];
    //Compensate参
    let isCompensate = this.formControl_step4.value;
    //Rate参
    let rate = this.rate;
    console.log(users + " " + algs + " " + isCompensate + " " + rate);

    this.http.post(this.myUrl + "/recommend",
      {"id": 1},
      {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
        withCredentials: true,
        params: {
          "users": users,
          // @ts-ignore
          "algBooleans": algs!,
          "isCompensate": isCompensate!,
          "rate": rate,
          "genres": this.genres
        }
      })
      .subscribe(
        (data) =>{
          console.log(data);
          this.isFinish = true;
          // @ts-ignore
          if(data['status'] == 0){
            // @ts-ignore
            if(!Array.isArray(data['data'])){
              this.otherRes = true;
              // @ts-ignore
              this.otherres = data['data'];
            }else{
              // @ts-ignore
              for(let i = 0;i < data['data'][0].length;i ++){
                this.shownMovies.push({
                  "name": "",
                  // @ts-ignore
                  "rate": data['data'][0][i]['rate'],
                  // @ts-ignore
                  "id": data['data'][0][i]['movieId']
                });
              }
              // @ts-ignore
              for(let i = 0;i < data['data'][1].length;i ++){
                // @ts-ignore
                this.shownMovies[i].name = data['data'][1][i];
              }
            }
          }else{
            this.otherRes = true;
            // @ts-ignore
            this.otherres = data['message'];
          }
        });

    return [
      {"name":"Movie1",
        "rate":4.5,
        "id":1},
      {"name":"Movie2",
        "rate":4.9,
        "id":2},
      {"name":"Movie3",
        "rate":4.1,
        "id":3},
    ];
  }

  removeKeyword(keyword: number) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || 0);
    if(this.keywords.length >= 5){
      return;
    }
    // Add our keyword
    if (value) {
      this.keywords.push(Number(value));
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeTag(keyword: number) {
    // @ts-ignore
    const index = this.genres.indexOf(keyword);
    if (index >= 0) {
      this.genres.splice(index, 1);
    }
  }

  addTag(id:number): void {
    // @ts-ignore
    this.genres.push(Number(id));
  }

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

  getGnereName(genreid:number){
    return this.s[genreid - 1].name;
  }


  firstFormGroup = this._formBuilder.group({
    firstCtrl: [' ', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: [' ', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    secondCtrl: [' ', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    secondCtrl: [' ', Validators.required],
  });
  fifthFormGroup = this._formBuilder.group({
    secondCtrl: [' ', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder, public route:ActivatedRoute, private http : HttpClient) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((res)=>{
      this.userId = Number(res['userid']);
      this.keywords = [this.userId];
      if(this.userId > 5500){
        this.isNewUser = true;
      }

      if(res['isAdminer'] == "true"){
        this.isAdminer = true;
      }else{
        this.isAdminer = false;
      }
      if(this.isAdminer){
        console.log("enable ui");
        this.formControl_step1.enable();
        this.formControl_step4.enable();
      }
    });
  }
}
