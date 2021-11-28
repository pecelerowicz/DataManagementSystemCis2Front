import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { createPasswordStrengthValidator } from '../../validators/password-strength.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  group: FormGroup;

  constructor() { }

  ngOnInit(): void {
    let fb: FormBuilder = new FormBuilder();
    this.group = fb.group({
      oldPassword: new FormControl('', {validators: [Validators.required, Validators.maxLength(20), Validators.minLength(8), createPasswordStrengthValidator()], updateOn: 'change'}),
      newPassword: new FormControl('', {validators: [Validators.required, Validators.maxLength(20), Validators.minLength(8), createPasswordStrengthValidator()], updateOn: 'change'}),
      newPasswordRepeat: new FormControl('', {validators: [Validators.required], updateOn: 'change'})
    }, 
    {
      validators: this.MustMatch('newPassword', 'newPasswordRepeat')
    })
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName]
      const matchinControl = formGroup.controls[matchingControlName]
      if(matchinControl.errors && !matchinControl.errors.MustMatch) {
        return
      }
      if(control.value !== matchinControl.value) {
        matchinControl.setErrors({MustMatch: true});
      } else {
        matchinControl.setErrors(null);
      }
    }
  }

  get f() {
    return this.group.controls;
  }

  onChangePassword() {
    
  }

}
