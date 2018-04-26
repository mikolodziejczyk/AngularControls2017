type labelAndErrorObjectToStringFunc = (label: string, error: any) => string;

/**
 * Maintains a list of validation error messages, allows registering custom ones.
 */
export class ValidationErrorMessages {

    private static messages: Map<string, labelAndErrorObjectToStringFunc>;


    /**
     * Registers an error message for a custom error object. Initializes the default messages as needed.
     * @param key The error key
     * @param message A function transforming the error object to a string or a string directly
     */
    public static registerErrorMessage(key: string, message: string | labelAndErrorObjectToStringFunc) {
        if (!ValidationErrorMessages.messages) ValidationErrorMessages.initialize();
        ValidationErrorMessages.internalRegisterErrorMessage(key, message);
    }

    /**
     * Retrieves the error message function for the specified error key. Returns null if not found.
     * @param key The error key, like "required", "minLength"
     */
    public static get(key: string): labelAndErrorObjectToStringFunc | null {
        if (!ValidationErrorMessages.messages) ValidationErrorMessages.initialize();

        let r: labelAndErrorObjectToStringFunc = ValidationErrorMessages.messages.get(key);

        // normalize not found result to null
        if (!r) r = null;

        return r;
    }


    private static internalRegisterErrorMessage(key: string, message: string | labelAndErrorObjectToStringFunc) {
        let func: labelAndErrorObjectToStringFunc;

        if (typeof (message) === "string") {
            func = (_: string) => message;
        }
        else {
            func = message;
        }

        ValidationErrorMessages.messages.set(key, func);
    }

    /**
     * Initializes the class with the default error messages for common errors.
     */
    public static initialize() {
        if (!ValidationErrorMessages.messages) {
            ValidationErrorMessages.messages = new Map<string, (_: any) => string>();
            ValidationErrorMessages.internalRegisterErrorMessage("required", (label) => `Wartość w polu '${label}' jest wymagana`);
            ValidationErrorMessages.internalRegisterErrorMessage("minlength", (label, minlength) => `Pole '${label}' musi zawierać co najmniej ${minlength.requiredLength} znaków.`);
        }
    }


}
