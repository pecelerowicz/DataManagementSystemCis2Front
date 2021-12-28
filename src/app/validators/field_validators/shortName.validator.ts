import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function createShortNameValidator(): ValidatorFn { // name to be changed
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if(!value || value === '') {
            return {shortNameEmpty: true, shortNameLengthExceeded: false};
        }
        if(value.length > 50) {
            return {shortNameEmpty: false, shortNameLengthExceeded: true};
        } 

    }
}