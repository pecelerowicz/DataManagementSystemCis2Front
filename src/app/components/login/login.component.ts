import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginRequest } from './login-request';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginRequest: LoginRequest;

  constructor(private authService: AuthService) {
    this.loginRequest = {
      username: '',
      password: '',
    };
  }

  ngOnInit(): void {}

  login(loginForm: NgForm, submit) {
    // console.log(loginForm.value, loginForm.valid, submit);
    this.loginRequest.username = loginForm.value.username;
    this.loginRequest.password = loginForm.value.password;

    this.authService.login(this.loginRequest).subscribe(
      () => {
        console.log('Login successful');
      },
      (err) => {
        console.log('error');
      }
    );
  }
}
