import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// the logic will be changed
export function createProjectNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if(!value || value === '') {
            return {nameEmpty: true, nameLengthExceeded: false, charError: false};
        }
        if(value.length > 30) {
            return {nameEmpty: false, nameLengthExceeded: true, charError: false};
        }

        let name: string = value;
        if(!/^[a-zA-Z]+[a-zA-Z0-9]*$/.test(name)) {
            return {nameEmpty: false, nameLengthExceeded: false, charError: true};
        }  

    }
}

export function createProjectDescriptionValidator(): ValidatorFn {
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