import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InfoService } from '../../../services/info.service';
import { createNameValidator } from '../../../validators/name.validator';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';
import { GetInfoResponse } from 'src/app/dto/info/info';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  order: number = 0;
  infoName: string = "";
  isFormDisabled: boolean = true;
  hasMetadata: boolean = false;

  isDifrVisible = false;
  isTestVisible = false;
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

  difr = this.fb.group({
    geometry: [''],
    incidentSoller: [''],
    incidentSlit: [''], 
    detectorSoller: [''],
    detectorSlit: [''],
    detectorAbsorber: [''],
    generatorVoltage: [''],
    generatorCurrent: [''],
    dataRangeStart: [''],
    dataRangeEnd: [''],
    stepSize: [''],
    stepTime: [''],
    stage: [''],
    spinningRocking: [''],
    spinningRockingVelocity: [''],
    temperature: [''],
    comments: ['']
  })

  test = this.fb.group({
    testField1:[''],
    testField2:[''],
    testField3:[''],
    testField4:[''],
    testField5:['']
  })

  toggleIsFormDisabled(): void {
    this.isFormDisabled = !this.isFormDisabled;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.order = parseInt(params.get('order'));
      this.infoName = this.sharedCommunicationService.fromListToMetadata.name;
      this.pullData();
    });
  }

  giveUpChanges() {
    this.pullData();
    this.isFormDisabled = true;
  }

  pullData() {
    this.infoService.getInfo(this.infoName).subscribe(
      val => {
        this.mapResponse(val);
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

        this.isDifrVisible = false;        
        this.isTestVisible = false;
        this.hasMetadata = false;
        if(getInfoResponse.getDifrInfoResponse != null) {
          this.isDifrVisible = true;
          this.hasMetadata = true;
          this.difr.patchValue({geometry: getInfoResponse.getDifrInfoResponse.geometry})
          this.difr.patchValue({incidentSoller: getInfoResponse.getDifrInfoResponse.incidentSoller})
          this.difr.patchValue({incidentSlit: getInfoResponse.getDifrInfoResponse.incidentSlit})
          this.difr.patchValue({detectorSoller: getInfoResponse.getDifrInfoResponse.detectorSoller})
          this.difr.patchValue({detectorSlit: getInfoResponse.getDifrInfoResponse.detectorSlit})
          this.difr.patchValue({detectorAbsorber: getInfoResponse.getDifrInfoResponse.detectorAbsorber})
          this.difr.patchValue({generatorVoltage: getInfoResponse.getDifrInfoResponse.generatorVoltage})
          this.difr.patchValue({generatorCurrent: getInfoResponse.getDifrInfoResponse.generatorCurrent})
          this.difr.patchValue({dataRangeStart: getInfoResponse.getDifrInfoResponse.dataRangeStart})
          this.difr.patchValue({dataRangeEnd: getInfoResponse.getDifrInfoResponse.dataRangeEnd})
          this.difr.patchValue({stepSize: getInfoResponse.getDifrInfoResponse.stepSize})
          this.difr.patchValue({stepTime: getInfoResponse.getDifrInfoResponse.stepTime})
          this.difr.patchValue({stage: getInfoResponse.getDifrInfoResponse.stage})
          this.difr.patchValue({spinningRocking: getInfoResponse.getDifrInfoResponse.spinningRocking})
          this.difr.patchValue({spinningRockingVelocity: getInfoResponse.getDifrInfoResponse.spinningRockingVelocity})
          this.difr.patchValue({temperature: getInfoResponse.getDifrInfoResponse.temperature})
          this.difr.patchValue({comments: getInfoResponse.getDifrInfoResponse.comments})
        }
        if(getInfoResponse.getTestInfoResponse != null) {
          this.isTestVisible = true;
          this.hasMetadata = true;
          this.test.patchValue({testField1: getInfoResponse.getTestInfoResponse.testField1})
          this.test.patchValue({testField2: getInfoResponse.getTestInfoResponse.testField2})
          this.test.patchValue({testField3: getInfoResponse.getTestInfoResponse.testField3})
          this.test.patchValue({testField4: getInfoResponse.getTestInfoResponse.testField4})
          this.test.patchValue({testField5: getInfoResponse.getTestInfoResponse.testField5})
        }
  }


  updateChanges() {
    // let
  }

}


// saveChanges() {
  //   let payload: InfoDto = {
  //     infoName: this.infoName,
  //     access: this.access.get('access').value,
  //     shortName: this.name.get('shortName').value, 
  //     longName: this.name.get('longName').value,
  //     deviceDto: {name: this.device.get('deviceName').value}
  //   }

  //   this.infoService.savePackageInfo(payload).subscribe(
  //     val => {
  //       console.log(val);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   )
  // }