import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { createPasswordStrengthValidator } from '../../../validators/password-strength.validator';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  order: number;

  name: FormControl = new FormControl(
    {value: 'Name value taken from the backend', disabled: true}, 
    {
      validators: [Validators.required, Validators.minLength(10)],
      updateOn: 'blur'
    });

  owner: FormControl = new FormControl(
    {value: 'Owner value taken from the backend', disabled: true}, 
    {
      validators: [Validators.required, Validators.minLength(10)], // to be changed
      updateOn: 'blur'
    });

  form: FormGroup = new FormGroup({
    name: this.name,
    owner: this.owner
  });

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.order = parseInt(this.route.snapshot.paramMap.get('order'));
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log(parseInt(params.get('order')))
      this.order = parseInt(params.get('order'));
    });
  }
}
