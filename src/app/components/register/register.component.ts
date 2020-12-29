import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterRequest } from './register.request';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerRequest: RegisterRequest;

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
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
      this.openSnackBar(data);
    });
  }

  openSnackBar(data: string) {
    this._snackBar.open(
      data + ' Check your email to activate your account.',
      '',
      {
        duration: 4000,
      }
    );
  }
}
