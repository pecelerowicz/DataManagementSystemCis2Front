import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterRequest } from './register.request';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerRequest: RegisterRequest;

  constructor(private authService: AuthService) {
    this.registerRequest = {
      username: '',
      email: '',
      password: '',
    };
  }

  ngOnInit(): void {}

  register(registerForm: NgForm, submit) {
    this.registerRequest.username = registerForm.value.username;
    this.registerRequest.email = registerForm.value.email;
    this.registerRequest.password = registerForm.value.password;

    this.authService.signup(this.registerRequest).subscribe((data) => {
      console.log(data);
    });
  }
}
