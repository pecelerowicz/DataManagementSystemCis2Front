import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterRequest } from './register.request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerRequest: RegisterRequest;

  constructor() {
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
    console.log(this.registerRequest);
  }
}
