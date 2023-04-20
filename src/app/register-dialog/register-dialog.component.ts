import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
export interface registerData{
  password:string;
  name:string;
  gender:number|null;
  age:number|null;
  occupation:number|null;
  zipnode:string;
}
@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent {
  registdata: registerData = {
    password:"",
    name:"",
    gender:null,
    age:null,
    occupation:null,
    zipnode:""
  }

  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
