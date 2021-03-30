import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService, ShoppinglistService } from '../../core/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IShoppinglist } from 'src/app/shared/interfaces';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.scss'],
})
export class ItemAddComponent implements OnInit {

  @Input() shoppinglist: IShoppinglist;
  @Output() itemAdded = new EventEmitter<any>();
  public addFormGroup: FormGroup;
  isLoading = false;
  errorMessage = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  encapsulation: ViewEncapsulation.None; 

  constructor(
    private itemService: ItemService,
    private shoppinglistService: ShoppinglistService,
    private router: Router,
    public _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.addFormGroup = new FormGroup({
      itemName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    if (this.addFormGroup.touched) {

      return this.addFormGroup.controls[controlName].hasError(errorName);
    }
  }

  get itemName() { return this.addFormGroup.get('itemName') };

  onSubmit(): void {
    const { itemName } = this.addFormGroup.value

    this.isLoading = true;

    this.itemService.loadItemByName(itemName)
      .subscribe((item) => {

        // Check if exist
        if (item) {

          // Add if not exist in the shopping list
          if (!item.shoppinglists.find(x => x.toString() === this.shoppinglist._id)) {

            this.shoppinglistService.addShoppinglistItem(this.shoppinglist._id, item._id)
              .subscribe({
                next: (response) => {
                  this.itemAdded.emit(response);
                  this.addFormGroup.reset();
                },
                error: (err) => {
                  this.isLoading = false;
                  console.log(err);
                }
              });
          }else {
            this.errorMessage = `You already added a ${itemName}`;
            this._snackBar.open(this.errorMessage, '', {
              duration: 3000,
              panelClass: ['warning'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
        } else {
          // Create item
          this.itemService.createItem(itemName, this.shoppinglist._id)
            .subscribe({
              next: (response) => {
                this.itemAdded.emit(response);
                this.addFormGroup.reset();
              },
              error: (err) => {
                this.isLoading = false;
                console.log(err);
              }
            });
        }
      });
  }
}
