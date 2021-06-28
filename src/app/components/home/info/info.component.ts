import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InfoService } from '../../../services/info.service';
import { createNameValidator } from '../../../validators/name.validator';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';
import { GetInfoResponse, UpdateInfoRequest } from 'src/app/dto/info/info';
import { CreateTestInfoRequest } from 'src/app/dto/info/test_info/test_info';
import { createDifrInfoRequest, getInitialValueDifr, mapDifrResponse } from 'src/app/mappers/difr';
import { createTestInfoRequest, getInitialValueTest, mapTestResponse } from 'src/app/mappers/test';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {

  infoState: InfoState = {
    order: 0,
    infoName: '',
    isFormDisabled: true,
    hasMetadata: false,
    isDifr: false,
    isTest: false
  }

  constructor(private route: ActivatedRoute, 
              private fb: FormBuilder,
              private sharedCommunicationService: SharedCommunicationService, 
              private infoService: InfoService) {}

  general = this.fb.group({
    access: ['Private', [Validators.required]],
    shortName: ['', {validators: [
      Validators.maxLength(100),  // check size
      createNameValidator()
    ], updateOn: 'change'}],
    longName: ['', {validators: [
      Validators.maxLength(200),
      createNameValidator()
    ], updateOn: 'change'}], // check size
    description: ['', {validators: [
      Validators.maxLength(200),
      Validators.required
    ], updateOn: 'change'}], // check size
  })



  difr = getInitialValueDifr();

  test = getInitialValueTest();

  toggleIsFormDisabled(): void {
    this.infoState.isFormDisabled = !this.infoState.isFormDisabled;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.infoState.order = parseInt(params.get('order'));
      this.infoState.infoName = this.sharedCommunicationService.fromListToMetadata.name;
      this.pullData();
    });
  }

  giveUpChanges() {
    this.pullData();
    this.infoState.isFormDisabled = true;
  }

  pullData() {
    this.infoService.getInfo(this.infoState.infoName).subscribe(
      val => {
        this.mapResponse(val);
        this.infoState.isFormDisabled = true;
      }, 
      err => {
        console.log(err);
      }
    )
  }

  mapResponse(getInfoResponse: GetInfoResponse) {
    this.general.patchValue({access: getInfoResponse.access});
        this.general.patchValue({
          shortName: getInfoResponse.shortName, 
          longName: getInfoResponse.longName,
          description: getInfoResponse.description
        });

        this.infoState.isDifr = false;        
        this.infoState.isTest = false;
        this.infoState.hasMetadata = false;
        if(getInfoResponse.getDifrInfoResponse != null) {
          mapDifrResponse(this.infoState, this.difr, getInfoResponse.getDifrInfoResponse);
        }
        if(getInfoResponse.getTestInfoResponse != null) {
          mapTestResponse(this.infoState, this.test, getInfoResponse.getTestInfoResponse);
        }
  }


  updateChanges() {
    let updateInfoRequest: UpdateInfoRequest = {
      infoName: this.infoState.infoName, 
      access: this.general.controls['access'].value,
      shortName: this.general.controls['shortName'].value,
      longName: this.general.controls['longName'].value,
      description: this.general.controls['description'].value,
      createDifrInfoRequest: null,
      createTestInfoRequest: null
    };
    if(this.infoState.isDifr) {
      updateInfoRequest.createDifrInfoRequest = createDifrInfoRequest(this.infoState, this.difr);
    }
    if(this.infoState.isTest) {
      updateInfoRequest.createTestInfoRequest = createTestInfoRequest(this.infoState, this.test);
    }

    this.infoService.updateInfo(updateInfoRequest).subscribe(
      val => {
        this.pullData();
      }, 
      err => {
        console.log(err);
      }
    )
  }

}

export interface InfoState {
  order: number,
  infoName: string,
  isFormDisabled: boolean,
  hasMetadata: boolean,
  isDifr: boolean,
  isTest: boolean
}
