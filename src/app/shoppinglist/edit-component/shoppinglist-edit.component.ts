import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ValidateWhitespace, CheckInput } from '../shoppinglist.validator';

export interface DialogData {
  id: string,
  name: string,
  index: number,
}

@Component({
  selector: 'app-shoppinglist-edit',
  templateUrl: './shoppinglist-edit.component.html',
  styleUrls: ['./shoppinglist-edit.component.scss']
})
export class ShoppinglistEditComponent implements OnInit {

  public form: FormGroup;
  minLength = 3;
  maxLength = 20;

  constructor(
    public dialogRef: MatDialogRef<ShoppinglistEditComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      shoppinglistName: new FormControl(this.data.name, [
        Validators.required,
        Validators.minLength(this.minLength),
        Validators.maxLength(this.maxLength),
        ValidateWhitespace,
      ]),
    });

    this.form
    .get('shoppinglistName')
    .valueChanges
    .subscribe((changes) => {
      const result = CheckInput(changes);

        if (result) {
          this.form
             .patchValue({ 'shoppinglistName': result });
        }
    });
  }

  public checkError = (controlName: string, errorNames: string[]) => {
    for (const errorName of errorNames) {
      if (this.form.controls[controlName].hasError(errorName)) {
        return true;
      }
    }
    return false;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.data);
    }
  }
}
