import { ValidationErrors } from "@angular/forms";

/**
 * Transforms an array of anonymous error messages into a ValidationErrors object.
 * @param errors An array of error messages.
 */
export function errorsToErrorObject(errors: string[]) : ValidationErrors {
    let r  = null;

    if (errors.length >0){
        r = {};
        let counter : number = 0;

        for (let error of errors) {
            let member = "anonymousError_"+counter.toString();
            counter++;
            r[member] = error;
        }

        return r;
    }
}