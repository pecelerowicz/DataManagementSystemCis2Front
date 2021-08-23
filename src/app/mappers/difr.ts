import { FormBuilder, FormGroup } from '@angular/forms';
import { InfoState } from '../components/home/info/info.component';
import { CreateDifrInfoRequest, DetectorAbsorber, Geometry, GetDifrInfoResponse, Stage } from '../dto/info/difr_info/difr_info';
import { createCommentsValidator, createDataRangeEndValidator, createDataRangeStartValidator, 
         createDetectorAbsorberValidator, createDetectorSlitValidator, 
         createDetectorSollerValidator, createGeneratorCurrentValidator, 
         createGeneratorVoltageValidator, createGeometryValidator, 
         createIncdentSlitValidator, createIncdentSollerValidator, 
         createSpinningRockingValidator, 
         createSpinningRockingVelocityValidator, 
         createStageValidator, 
         createStepSizeValidator, createStepTimeValidator, createTemperatureValidator } 
         from '../validators/info_validators/diffractometer';

export function getInitialValueDifr(): FormGroup {
    let fb: FormBuilder = new FormBuilder();
    return fb.group({
        geometry: ['', {validators: [createGeometryValidator()]}],
        incidentSoller: ['', {validators: [createIncdentSollerValidator()]}],
        incidentSlit: ['', {validators: [createIncdentSlitValidator()]}], 
        detectorSoller: ['', {validators: [createDetectorSollerValidator()]}],
        detectorSlit: ['', {validators: [createDetectorSlitValidator()]}],
        detectorAbsorber: ['', {validators: [createDetectorAbsorberValidator()]}],
        generatorVoltage: ['', {validators: [createGeneratorVoltageValidator()]}],
        generatorCurrent: ['', {validators: [createGeneratorCurrentValidator()]}],
        dataRangeStart: ['', {validators: [createDataRangeStartValidator()]}],
        dataRangeEnd: ['', {validators: [createDataRangeEndValidator()]}],
        stepSize: ['', {validators: [createStepSizeValidator()]}],
        stepTime: ['', {validators: [createStepTimeValidator()]}],
        stage: ['', {validators: [createStageValidator()]}],
        spinningRocking: ['', {validators: [createSpinningRockingValidator()]}],
        spinningRockingVelocity: ['', {validators: [createSpinningRockingVelocityValidator()]}],
        temperature: ['', {validators: [createTemperatureValidator()]}],
        comments: ['', {validators: [createCommentsValidator()]}]
      })
}

export function mapDifrResponse(infoState: InfoState, formGroup: FormGroup, getDifrInfoResponse: GetDifrInfoResponse) {
    infoState.isDifr = true;
    infoState.hasMetadata = true;
    formGroup.patchValue({geometry: getDifrInfoResponse.geometry})
    formGroup.patchValue({incidentSoller: getDifrInfoResponse.incidentSoller})
    formGroup.patchValue({incidentSlit: getDifrInfoResponse.incidentSlit})
    formGroup.patchValue({detectorSoller: getDifrInfoResponse.detectorSoller})
    formGroup.patchValue({detectorSlit: getDifrInfoResponse.detectorSlit})
    formGroup.patchValue({detectorAbsorber: getDifrInfoResponse.detectorAbsorber})
    formGroup.patchValue({generatorVoltage: getDifrInfoResponse.generatorVoltage})
    formGroup.patchValue({generatorCurrent: getDifrInfoResponse.generatorCurrent})
    formGroup.patchValue({dataRangeStart: getDifrInfoResponse.dataRangeStart})
    formGroup.patchValue({dataRangeEnd: getDifrInfoResponse.dataRangeEnd})
    formGroup.patchValue({stepSize: getDifrInfoResponse.stepSize})
    formGroup.patchValue({stepTime: getDifrInfoResponse.stepTime})
    formGroup.patchValue({stage: getDifrInfoResponse.stage})
    formGroup.patchValue({spinningRocking: getDifrInfoResponse.spinningRocking})
    formGroup.patchValue({spinningRockingVelocity: getDifrInfoResponse.spinningRockingVelocity})
    formGroup.patchValue({temperature: getDifrInfoResponse.temperature})
    formGroup.patchValue({comments: getDifrInfoResponse.comments})
}

export function createCreateDifrInfoRequest(infoState: InfoState, formGroup: FormGroup): CreateDifrInfoRequest {
    return {
        infoName: infoState.infoName,
        geometry: formGroup.controls['geometry'].value,//Geometry.bb,
        incidentSoller: formGroup.controls['incidentSoller'].value,//1,
        incidentSlit: formGroup.controls['incidentSlit'].value,
        detectorSoller: formGroup.controls['detectorSoller'].value,
        detectorSlit: formGroup.controls['detectorSlit'].value,
        detectorAbsorber: formGroup.controls['detectorAbsorber'].value,
        generatorVoltage: formGroup.controls['generatorVoltage'].value,
        generatorCurrent: formGroup.controls['generatorCurrent'].value,
        dataRangeStart: formGroup.controls['dataRangeStart'].value,
        dataRangeEnd: formGroup.controls['dataRangeEnd'].value,
        stepSize: formGroup.controls['stepSize'].value,
        stepTime: formGroup.controls['stepTime'].value,
        stage: formGroup.controls['stage'].value,
        spinningRocking: formGroup.controls['spinningRocking'].value,
        spinningRockingVelocity: formGroup.controls['spinningRockingVelocity'].value,
        temperature: formGroup.controls['temperature'].value,
        comments: formGroup.controls['comments'].value,
      };
}

const geometries: Geometry[] = [Geometry.bb, Geometry.pb_gm];
export { geometries };

const detectorAbsorbers: DetectorAbsorber[] = [DetectorAbsorber.cu01, DetectorAbsorber.cu02, DetectorAbsorber.ni01];
export { detectorAbsorbers };

const stages: Stage[] = [Stage.spinner, Stage.htk1200n];
export { stages };
