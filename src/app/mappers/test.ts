import { FormBuilder, FormGroup } from '@angular/forms';
import { InfoState } from '../components/home/info/info.component';
import { CreateTestInfoRequest, GetTestInfoResponse } from '../dto/info/test_info/test_info';


export function getInitialValueTest(): FormGroup {
    let fb: FormBuilder = new FormBuilder();
    return fb.group({
        testField1: [''],
        testField2: [''],
        testField3: [''], 
        testField4: [''],
        testField5: [''],
      })
}

export function mapTestResponse(infoState: InfoState, formGroup: FormGroup, getTestInfoResponse: GetTestInfoResponse) {
    infoState.isTest = true;
    infoState.hasMetadata = true;
    formGroup.patchValue({testField1: getTestInfoResponse.testField1})
    formGroup.patchValue({testField2: getTestInfoResponse.testField2})
    formGroup.patchValue({testField3: getTestInfoResponse.testField3})
    formGroup.patchValue({testField4: getTestInfoResponse.testField4})
    formGroup.patchValue({testField5: getTestInfoResponse.testField5})
}

export function createCreateTestInfoRequest(infoState: InfoState, formGroup: FormGroup): CreateTestInfoRequest {
    return {
        infoName: infoState.infoName,
        testField1: formGroup.controls['testField1'].value,
        testField2: formGroup.controls['testField2'].value,
        testField3: formGroup.controls['testField3'].value,
        testField4: formGroup.controls['testField4'].value,
        testField5: formGroup.controls['testField5'].value
      };
}