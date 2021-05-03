import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-step',
  templateUrl: './test-step.component.html',
  styleUrls: ['./test-step.component.css']
})
export class TestStepComponent implements OnInit {

  // names: FormGroup = this.fb.group({
  //   shortName: ['', Validators.required, Validators.minLength(5), Validators.maxLength(100)],
  //   longName: ['', Validators.required, Validators.minLength(5), Validators.maxLength(200)]
  // })

  // access = this.fb.group({
  //   access: ['private', Validators.required]
  // })

  // device = this.fb.group({
  //   deviceName: ['', Validators.required]
  // })

  // visibility: boolean[] = [true, false, true];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  // isVisible(index: number): boolean {
  //   return this.visibility[index];
  // }
}
