import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { createPasswordStrengthValidator } from '../../validators/password-strength.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let fb: FormBuilder = new FormBuilder();
    this.group = fb.group({
      oldPassword: ['', {validators: [Validators.maxLength(20), Validators.minLength(8), createPasswordStrengthValidator()], updateOn: 'change'}],
      newPassword: ['', {validators: [Validators.maxLength(20), Validators.minLength(8), createPasswordStrengthValidator()], updateOn: 'change'}],
      newPasswordRepeat: ['', {validators: [Validators.maxLength(20), Validators.minLength(8), createPasswordStrengthValidator()], updateOn: 'change'}]
    })
  }

  group: FormGroup;

  changePassword() {
    
  }

}
