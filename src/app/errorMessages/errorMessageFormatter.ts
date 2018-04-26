import { ValidationErrorMessages } from "./validationErrorMessages";
import { FormattableError } from "./formattableError";

export class ErrorMessageFormatter {
    /**
     * Gets a complete error message for an entry in ValidationErrors.
     * @param key - the key of an entry in control.errors
     * @param value - the corresponding value (it contents depends on the validator)
     * @param label - the control label to use when formatting the message
     */
    formatErrorMessage(key: string, value: any, label: string): string {
        let r: string = "unknown error";

        // try a registered (default) error message function - for standard validators
        let msgFunc = ValidationErrorMessages.get(key);
        if (msgFunc != null) {
            r = msgFunc(label, value);
        }
        else {
            // no registered standatd message for the key, create a message from the error object iself 
            if (typeof (value) === "string") {
                // the error value is a string directly so that we can add it to the messages, adding label
                if (label) {
                    r = sprintf(value, label);
                }
                else {
                    // but if there's no label, we don't format the message
                    r = value;
                }
            }
            else if (typeof (value) === "function") {
                // the error value is a function left by the validator, we call it with a label
                r = value(label);
            }
            else if (typeof (value) === "object" && (<FormattableError>value).formatErrorMessage) {
                // the error value is an object which implements FormattableError (formatErrorMessage in particular)
                // call this method with the message label and the error object isself
                r = (<FormattableError>value).formatErrorMessage(value, label);
            }
            else {
                // unknown error
            }
        }

        return r;
    }
}