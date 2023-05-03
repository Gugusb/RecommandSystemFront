import {Component, Inject} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.css']
})
export class RatingDialogComponent {
  rating:number = 0;

  constructor(private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<RatingDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
