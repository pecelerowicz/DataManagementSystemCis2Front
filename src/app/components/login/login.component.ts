import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginRequest } from './login-request';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
  }

  loginRequest: LoginRequest = {username: '', password: ''};
  
  login(loginForm: NgForm) {
    this.loginRequest.username = loginForm.value.username;
    this.loginRequest.password = loginForm.value.password;
    this.authService.login(this.loginRequest);
  }
}
