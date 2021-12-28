import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { createNameValidator } from 'src/app/validators/name.validator';
import { InfoState } from '../components/home/info/info.component';
import { Access, GetInfoResponse, UpdateInfoRequest } from '../dto/info/info';
import { createShortNameValidator } from 'src/app/validators/field_validators/shortName.validator';
import { createLongNameValidator } from 'src/app/validators/field_validators/longName.validator';
import { createDescriptionValidator } from 'src/app/validators/field_validators/description.validator';

export function getInitialValueGeneral(): FormGroup {
    let fb: FormBuilder = new FormBuilder();
    return fb.group({
        access: [Access.private, [Validators.required]],
        title: ['', {validators: [createShortNameValidator()/*Validators.maxLength(100)*//*, createNameValidator()*/], updateOn: 'change'}],
        shortDescription: ['', {validators: [createLongNameValidator()/*Validators.maxLength(200)*//*, createNameValidator()*/], updateOn: 'change'}],
        description: ['', {validators: [createDescriptionValidator()/*Validators.maxLength(200), Validators.required*/], updateOn: 'change'}],
        localDate: ['', {validators: []}]})
}

export function mapGeneralResponse(general: FormGroup, getInfoResponse: GetInfoResponse) {
        general.patchValue({
          access: getInfoResponse.access,
          title: getInfoResponse.title, 
          shortDescription: getInfoResponse.shortDescription,
          description: getInfoResponse.description,
          localDate: getInfoResponse.localDate
        });
}

export function createUpdateInfoRequest(infoState: InfoState, general: FormGroup): UpdateInfoRequest {
  return {
    infoName: infoState.infoName,
    access: general.controls['access'].value,
    title: general.controls['title'].value,
    shortDescription: general.controls['shortDescription'].value,
    description: general.controls['description'].value,
    // localDate: general.controls['localDate'].value,
    createDifrInfoRequest: null,
    createTestInfoRequest: null
  }
}
