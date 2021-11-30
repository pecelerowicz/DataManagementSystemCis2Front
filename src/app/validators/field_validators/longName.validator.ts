import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function createLongNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if(!value || value === '') {
            return {longNameEmpty: true, longNameLengthExceeded: false};
        }
        if(value.length > 80) {
            return {longNameEmpty: false, longNameLengthExceeded: true};
        } 

    }
}