import { ErrorMessageFormatter } from "./errorMessageFormatter";
import { sprintf } from "sprintf-js"
import { FormattableError } from "./formattableError";


describe('ErrorMessageFormatter', () => {

    let emf: ErrorMessageFormatter = null;
    let nonRegisteredKey = "_AN_UNIQUE_ERROR_KEY";

    beforeEach(() => {
        emf = new ErrorMessageFormatter();
    });

    it ('a registered error uses a standard error message function, with the specified label', () =>{
        let key = "required";
        let value = true;
        let label = "myLabel";
        let result = emf.formatErrorMessage(key, value, label);
        expect(result).toContain(label);
    });

    it('a string error is formatted with label', () => {
        let value = "Error message for %s";
        let label = "myLabel";
        let result = emf.formatErrorMessage(nonRegisteredKey, value, label);
        let expected = sprintf(value, label);
        expect(result).toBe(expected);
    });

    it('a string error without label is returned directly', () => {
        let value = "Error message for %s";
        let label: string = undefined;
        let result = emf.formatErrorMessage(nonRegisteredKey, value, label);
        let expected = value;
        expect(result).toBe(expected);
    });

    it('a function error is called with the label as a parameter', () => {
        let label = "myLabel";
        let value = (l: string) => `message ${l}`;
        let result = emf.formatErrorMessage(nonRegisteredKey, value, label);
        expect(result).toBe('message myLabel');
    });

    it('a formattableError is formatted with the error object and the label', () => {
        let label = "myLabel";
        let value : any = {};
        value.myProperty = 5;
        (<FormattableError>value).formatErrorMessage = (obj : any, l : string) => `message ${obj.myProperty} ${l}`;
        let result = emf.formatErrorMessage(nonRegisteredKey, value, label);
        expect(result).toBe('message 5 myLabel');
    });
    
});