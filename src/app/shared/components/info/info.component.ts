import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogInfoData {
  user: string,
  info: string,
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<InfoComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: DialogInfoData,
  ) { }

  ngOnInit(): void {
  }

  onCancelClick():void {
    this.dialogRef.close();
  }

}
