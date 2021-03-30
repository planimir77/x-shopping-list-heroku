import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PrivacyPolicyDialogComponent } from 'src/app/shared/components/privacy-policy/dialog/privacy-policy-dialog.component';
import { AuthService } from '../../core/services/auth.service';
import { PasswordsMustMatch } from './register.validator'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  focus;
  focus1;
  focus2;

  form: FormGroup;
  isLoading = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      rePassword: new FormControl('', [
        Validators.required,
      ]),
      privacyPolicy: new FormControl('', [
        Validators.requiredTrue
      ]),
    },
      PasswordsMustMatch
    );
  }

  public checkError = (controlName: string, errorName: string) => {
    debugger;
    if (this.form.touched) {
      return this.form.controls[controlName].hasError(errorName);
    }
  }

  get username() { return this.form.get('username') };
  get email() { return this.form.get('email') };
  get password() { return this.form.get('password') };
  get rePassword() { return this.form.get('rePassword') };
  get privacyPolicy() { return this.form.get('privacyPolicy') };

  onSubmit(): void {
    const data = this.form.value;
    data.username = data.username.toLowerCase();
    debugger;

    this.isLoading = true;

    if (data.privacyPolicy) {
      this.authService.register(data).subscribe({
        next: (response) => {
          console.log(response);
          this.isLoading = false;
          this.router.navigate(['/user/login']);
        },
        error: (response) => {
          this.isLoading = false;
          this.snackBar.open(`${response.error.message}`, "", {
            duration: 5000,
            panelClass: "warning",
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      });
    }

  }
  openDialog() {
    const dialogRef = this.dialog.open(PrivacyPolicyDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.form.controls.privacyPolicy.setValue(result);
      }
    });
  }
}
