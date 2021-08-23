import { AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function createGeometryValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if(!value || value === '') {
            return {nameEmpty: true, nameIllegal: false};
        }
        if(!(value==="BB" || value==="Pb_GM")) {
            return {nameEmpty: false, nameIllegal: true};
        }
 
    }
}

export function createIncdentSollerValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const name =  control.value;

        if(!name || name === '') {
            return {nameEmpty: true, nameIllegal: false};
        }
        if(isNaN(name) || name<0 || name>100) {
            return {nameEmpty: false, nameIllegal: true};
        }
    }
}

export function createIncdentSlitValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const name =  control.value;

        if(!name || name === '') {
            return {nameEmpty: true, nameIllegal: false};
        }
        if(isNaN(name) || name<0 || name>50) {
            return {nameEmpty: false, nameIllegal: true};
        }
    }
}

export function createDetectorSollerValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const name =  control.value;

        if(!name || name === '') {
            return {nameEmpty: true, nameIllegal: false};
        }
        if(isNaN(name) || name<0 || name>50) {
            return {nameEmpty: false, nameIllegal: true};
        }
    }
}

export function createDetectorSlitValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const name =  control.value;

        if(!name || name === '') {
            return {nameEmpty: true, nameIllegal: false};
        }
        if(isNaN(name) || name<0 || name>50) {
            return {nameEmpty: false, nameIllegal: true};
        }
    }
}

export function createDetectorAbsorberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if(!value || value === '') {
            return {nameEmpty: true, nameIllegal: false};
        }
        if(!(value==="CU01" || value==="CU02" || value==="NI01")) {
            return {nameEmpty: false, nameIllegal: true};
        }
    }
}

export function createGeneratorVoltageValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const name =  control.value;

        if(!name || name === '') {
            return {nameEmpty: true, nameIllegal: false};
        }
        if(isNaN(name) || name<0 || name>100) {
            return {nameEmpty: false, nameIllegal: true};
        }
    }
}

export function createGeneratorCurrentValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const name =  control.value;

        if(!name || name === '') {
            return {nameEmpty: true, nameIllegal: false};
        }
        if(isNaN(name) || name<0 || name>100) {
            return {nameEmpty: false, nameIllegal: true};
        }
    }
}

export function createDataRangeStartValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const name =  control.value;

        if(!name || name === '') {
            return {nameEmpty: true, nameIllegal: false};
        }
        if(isNaN(name) || name<-180 || name>180) {
            return {nameEmpty: false, nameIllegal: true};
        }
    }
}

export function createDataRangeEndValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const name =  control.value;

        if(!name || name === '') {
            return {nameEmpty: true, nameIllegal: false};
        }
        if(isNaN(name) || name<-180 || name>180) {
            return {nameEmpty: false, nameIllegal: true};
        }
    }
}

export function createStepSizeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const name =  control.value;

        if(!name || name === '') {
            return {nameEmpty: true, nameIllegal: false};
        }
        if(isNaN(name) || name<0 || name>1000) {
            return {nameEmpty: false, nameIllegal: true};
        }
    }
}

export function createStepTimeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const name =  control.value;

        if(!name || name === '') {
            return {nameEmpty: true, nameIllegal: false};
        }
        if(isNaN(name) || name<0 || name>1000000) {
            return {nameEmpty: false, nameIllegal: true};
        }
    }
}

export function createStageValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if(!value || value === '') {
            return {nameEmpty: true, nameIllegal: false};
        }
        if(!(value==="SPINNER" || value==="HTK1200N")) {
            return {nameEmpty: false, nameIllegal: true};
        }
    }
}

export function createSpinningRockingValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if(value === '') {
            return {nameEmpty: true, nameIllegal: false};
        }
    }
}

export function createSpinningRockingVelocityValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if(value === '') {
            return {nameEmpty: true, nameIllegal: false};
        }
        if(isNaN(value)) {
            return {nameEmpty: false, nameIllegal: true};
        }
    }
}

export function createTemperatureValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const name =  control.value;

        if(!name || name === '') {
            return {nameEmpty: true, nameIllegal: false};
        }
        if(isNaN(name) || name<-300 || name>5000) {
            return {nameEmpty: false, nameIllegal: true};
        }
    }
}

export function createCommentsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if(value === '') {
            return {nameEmpty: true, nameIllegal: false};
        }
    }
}