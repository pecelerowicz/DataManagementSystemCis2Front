import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function createNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if(!value || value === '') {
            return {nameEmpty: true, nameLengthExceeded: false, charError: false};
        }
        if(value.length > 100) {
            return {nameEmpty: false, nameLengthExceeded: true, charError: false};
        }

        let name: string = value;
        if(!/^[A-Za-z0-9]+([ _][A-Za-z0-9]+)*$/.test(name)) {
            return {nameEmpty: false, nameLengthExceeded: false, charError: true};
        }  

    }
}
