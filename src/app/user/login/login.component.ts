import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  focus;
  focus1;

  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      rememberMe: new FormControl('', []),
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    if (this.loginForm.touched) {

      return this.loginForm.controls[controlName].hasError(errorName);
    }
  }

  get email() { return this.loginForm.get('email') };
  get password() { return this.loginForm.get('password') };
  get rememberMe() { return this.loginForm.get('rememberMe') };

  onSubmit(): void {
    const data = this.loginForm.value;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(data).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || err.statusText;
        this.isLoading = false;
        console.log(err);
      }
    });
  }
}
