export interface FormattableError {
    formatErrorMessage(validationError : any, label: string) : string;
}