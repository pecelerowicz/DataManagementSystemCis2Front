import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginRequest } from './login-request';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router,  private localStorage: LocalStorageService) {}
  ngOnInit(): void {
    if(this.localStorage.retrieve('username')) {
      this.router.navigate(['/home']);
    }
  }

  loginRequest: LoginRequest = {username: '', password: ''};
  
  login(loginForm: NgForm) {
    this.loginRequest.username = loginForm.value.username;
    this.loginRequest.password = loginForm.value.password;
    this.authService.login(this.loginRequest);
  }
}
