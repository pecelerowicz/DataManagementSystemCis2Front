import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function createDescriptionValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if(!value || value === '') {
            return {descriptionEmpty: true, descriptionLengthExceeded: false};
        }
        if(value.length > 500) {
            return {descriptionEmpty: false, descriptionLengthExceeded: true};
        } 

    }
}