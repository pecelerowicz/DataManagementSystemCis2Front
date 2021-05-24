import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InfoService } from '../../../services/info.service';
import { createNameValidator } from '../../../validators/name.validator';
import { InfoDto } from '../../../dto/info';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  order: number;
  infoName: string = "aaaa";
  isDisabled: boolean = true;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private infoService: InfoService) {}

  access = this.fb.group({
    access: ['Private', [Validators.required]]
  })

  name: FormGroup = this.fb.group({
    shortName: ['', {validators: [
      Validators.maxLength(100),  // check size
      createNameValidator()
    ], updateOn: 'change'}],
    longName: ['', {validators: [
      Validators.maxLength(200),
      createNameValidator()
    ], updateOn: 'change'}] // check size
  })

  // publication = this.fb.group({
  //   title: ['', [Validators.required]],
  //   doi: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]], // ?
  //   authors: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]]
  // })

  device = this.fb.group({
    deviceName: ['', [Validators.required]]
  })

  categories: string[] = ["Access", "Name", /*"Publication",*/ "Device"];
  visibility: boolean[] = [true, false, /*false,*/ false];
  allVisible: boolean = false;
  edit: boolean = true;


  isVisible(index: number): boolean {
    return this.visibility[index];
  }

  selectMetadata(i: number) {
    this.visibility[i] = true;
    this.allVisible = !this.visibility.includes(false);
  }

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  isAddDisabled() {
    return !this.isDisabled || this.allVisible;
  }

  giveUpChanges() {
    this.pullData();
  }

  saveChanges() {
    let payload: InfoDto = {
      infoName: this.infoName,
      access: this.access.get('access').value,
      shortName: this.name.get('shortName').value, 
      longName: this.name.get('longName').value,
      deviceDto: {name: this.device.get('deviceName').value}
    }

    this.infoService.savePackageInfo(payload).subscribe(
      val => {
        console.log(val);
      },
      err => {
        console.log(err);
      }
    )
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.order = parseInt(params.get('order'));
    });

    this.pullData();

  }

  pullData() {
    this.infoService.getPackageInfo(this.infoName).subscribe(
      val => {
        this.access.patchValue({access: val.access});
        this.name.patchValue({
          shortName: val.shortName, 
          longName: val.longName
        });
        this.device.patchValue({
          deviceName: val.deviceDto.name
        })
      }, 
      err => {
        console.log(err);
      }
    )
  }

}
