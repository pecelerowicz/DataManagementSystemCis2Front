import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createNameValidator } from 'src/app/validators/name.validator';
import { InfoState } from '../components/home/info/info.component';
import { GetInfoResponse, UpdateInfoRequest } from '../dto/info/info';


export function getInitialValueGeneral(): FormGroup {
    let fb: FormBuilder = new FormBuilder();
    return fb.group({
        access: ['Private', [Validators.required]],
        shortName: ['', {validators: [Validators.maxLength(100), createNameValidator()], updateOn: 'change'}],
        longName: ['', {validators: [Validators.maxLength(200), createNameValidator()], updateOn: 'change'}],
        description: ['', {validators: [Validators.maxLength(200), Validators.required], updateOn: 'change'}]})
}

export function mapGeneralResponse(general: FormGroup, getInfoResponse: GetInfoResponse) {
        general.patchValue({
          access: getInfoResponse.access,
          shortName: getInfoResponse.shortName, 
          longName: getInfoResponse.longName,
          description: getInfoResponse.description
        });
}

export function createUpdateInfoRequest(infoState: InfoState, general: FormGroup): UpdateInfoRequest {
  return {
    infoName: infoState.infoName,
    access: general.controls['access'].value,
    shortName: general.controls['shortName'].value,
    longName: general.controls['longName'].value,
    description: general.controls['description'].value,
    createDifrInfoRequest: null,
    createTestInfoRequest: null
  }
}

