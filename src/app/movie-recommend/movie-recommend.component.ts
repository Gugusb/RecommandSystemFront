import { Component } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatChipInputEvent} from '@angular/material/chips';
import {AppComponent} from "../app.component";
import {ActivatedRoute} from "@angular/router";
import {number} from "echarts/core";

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
  keywords = [1];
  isEditable:boolean = true;
  formControl_step1 = new FormControl({value: ['userid'], disabled : true});
  formControl_step4 = new FormControl({value: false, disabled : true});
  isAdminer:boolean = false;
  userId:number = 0;
  rate:number = 0.8;
  isStart:boolean = false;
  isFinish:boolean = false;
  shownMovies:recommendMovie[] = [];
  timer:any;

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
    this.shownMovies = this.getRecommendMovie();
    this.isFinish = true;
  }

  getRecommendMovie():recommendMovie[]{
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

  constructor(private _formBuilder: FormBuilder, public route:ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((res)=>{
      this.userId = Number(res['userid']);
      this.keywords = [this.userId];

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
