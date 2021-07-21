import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// not used
export function createAccessValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if(!value ) {
            return {noAccess: true};
        }

    }
}
