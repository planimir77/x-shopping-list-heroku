import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ShoppinglistService } from '../../core/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidateWhitespace, CheckInput } from '../shoppinglist.validator'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shoppinglist-create',
  templateUrl: './shoppinglist-create.component.html',
  styleUrls: ['./shoppinglist-create.component.scss']
})
export class ShoppinglistCreateComponent implements OnInit {

  public addShopFormGroup: FormGroup;
  isLoading = false;
  minLength = 3;
  maxLength = 20;
  isLogged: boolean;

  constructor(
    private shoppinglistService: ShoppinglistService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe(isLogged =>
      this.isLogged = isLogged);

    this.addShopFormGroup = new FormGroup({
      shoppinglistName: new FormControl('', [
        Validators.required,
        Validators.minLength(this.minLength),
        Validators.maxLength(this.maxLength),
        ValidateWhitespace,
      ]),
    });

    this.addShopFormGroup
      .get('shoppinglistName')
      .valueChanges
      .subscribe((changes) => {
        const result = CheckInput(changes);

        if (result) {
          this.addShopFormGroup
            .patchValue({ 'shoppinglistName': result });
        }
      });
  }

  public checkError = (controlName: string, errorNames: string[]) => {
    for (const errorName of errorNames) {
      if (this.addShopFormGroup.controls[controlName].hasError(errorName)) {
        return true;
      }
    }
    return false;
  }

  onSubmit(): void {
    this.isLoading = true;

    const shoppinglistName = this.addShopFormGroup.value.shoppinglistName.trimEnd();

    this.shoppinglistService.createShoppinglist(shoppinglistName)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/shoppinglist/', response._id]);
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        }
      });
  }
}
