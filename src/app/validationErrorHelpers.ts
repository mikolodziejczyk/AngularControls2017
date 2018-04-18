import { ValidationErrors, FormControl } from "@angular/forms";

export function setControlError(control: FormControl, errorKey: string, errorValue: any) {
    console.log(`setControlError called with ${errorKey} : ${errorValue}`);
    let errors: ValidationErrors = control.errors || {};
    if (!errors[errorKey] ) {
    errors[errorKey] = errorValue;
    control.setErrors(errors);
    }
}

export function removeControlError(control: FormControl, errorKey: string) {
    console.log(`removeControlError called with ${errorKey}`);
    let errors: ValidationErrors = control.errors;
    if (!errors) return;
    if (errors[errorKey]) {
        delete errors[errorKey];
        control.setErrors(errors);
    }
}