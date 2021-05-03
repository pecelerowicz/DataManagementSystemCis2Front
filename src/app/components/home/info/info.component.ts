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

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  names: FormGroup = this.fb.group({
    shortName: ['', Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    longName: ['', Validators.required, Validators.minLength(5), Validators.maxLength(200)]
  })

  access = this.fb.group({
    access: ['private', Validators.required]
  })

  publication = this.fb.group({
    title: ['', Validators.required],
    doi: ['', Validators.required, Validators.minLength(5), Validators.maxLength(20)], // ?
    authors: ['', Validators.required, Validators.minLength(4), Validators.maxLength(200)]
  })

  device = this.fb.group({
    deviceName: ['', Validators.required]
  })

  categories: string[] = ["Name", "Access", "Publication", "Device"];
  visibility: boolean[] = [false, false, false, false];
  allVisible: boolean = false;


  isVisible(index: number): boolean {
    return this.visibility[index];
  }

  selectMetadata(i: number) {
    this.visibility[i] = true;
    this.allVisible = !this.visibility.includes(false);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.order = parseInt(params.get('order'));
    });
  }

}
