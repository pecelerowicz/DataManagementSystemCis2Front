import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { createPasswordStrengthValidator } from '../../../validators/password-strength.validator';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  order: number;
  disabled: boolean = true;

  form: FormGroup = this.fb.group({
    name: [
      {
        value: 'Name value taken from the backend', 
        disabled: this.disabled
      },
      {
        validators: [Validators.required, Validators.minLength(10)],
        updateOn: 'blur'
      }
    ],
    owner: [
      {
        value: 'Owner value taken from the backend', 
        disabled: this.disabled
      },
      {
        validators: [Validators.required, Validators.minLength(8)],
        updateOn: 'blur'
      }
    ]
  });

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.order = parseInt(this.route.snapshot.paramMap.get('order'));
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log(parseInt(params.get('order')))
      this.order = parseInt(params.get('order'));
    });
  }

}
