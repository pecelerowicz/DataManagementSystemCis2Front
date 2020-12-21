import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  login(loginForm: NgForm, submit) {
    console.log(loginForm.value, loginForm.valid, submit);
  }

  onEmailChange(change) {
    console.log(change);
  }
}
