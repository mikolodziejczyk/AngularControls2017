import { ValidationErrors, FormControl } from "@angular/forms";

export function setControlError(control: FormControl, errorKey: string, errorValue: any) {
    let errors: ValidationErrors = control.errors || {};
    errors[errorKey] = errorValue;
    control.setErrors(errors);
}

export function removeControlError(control: FormControl, errorKey: string) {
    let errors: ValidationErrors = control.errors;
    if (!errors) return;
    if (errors[errorKey]) {
        delete errors[errorKey];
        control.setErrors(errors);
    }
}