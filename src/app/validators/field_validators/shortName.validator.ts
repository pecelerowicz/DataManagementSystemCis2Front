import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function createShortNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if(!value || value === '') {
            return {shortNameEmpty: true, shortNameLengthExceeded: false};
        }
        if(value.length > 30) {
            return {shortNameEmpty: false, shortNameLengthExceeded: true};
        } 

    }
}