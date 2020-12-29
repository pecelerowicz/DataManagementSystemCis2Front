import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginRequest } from './login-request';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginRequest: LoginRequest;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.loginRequest = {
      username: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.registered !== undefined && params.registered === 'true') {
        this._snackBar.open(
          'Registration Successful. Check your inbox for activation link.',
          '',
          {
            duration: 6000,
          }
        );
      }
    });
  }

  login(loginForm: NgForm, submit) {
    // console.log(loginForm.value, loginForm.valid, submit);
    this.loginRequest.username = loginForm.value.username;
    this.loginRequest.password = loginForm.value.password;

    this.authService.login(this.loginRequest).subscribe(
      () => {
        //console.log('Login successful');
        this._snackBar.open('Login Successful.', '', {
          duration: 6000,
        });
      },
      (err) => {
        // console.log('error');
        this._snackBar.open('Login failed. Please try again.', '', {
          duration: 6000,
        });
      }
    );
  }
}
