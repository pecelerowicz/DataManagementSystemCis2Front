import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// export function createNameValidator(): ValidatorFn {
//     return (control: AbstractControl): ValidationErrors | null => {
//       const value = control.value;
  
//       if (!value) {
//         return null;
//       }

//       const startsWithSpace = value !== '' && value.startsWith(' ');
//       return startsWithSpace ? { startsWithSpace: true } : null;
//     };
// }