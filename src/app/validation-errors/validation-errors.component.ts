
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationErrorMessages } from '../errorMessages/validationErrorMessages';
import { sprintf } from "sprintf-js"
import { format } from 'url';
import { FormattableError } from '../errorMessages/formattableError';

@Component({
  selector: 'mko-validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.less']
})
/**
 * Displays error messages in divs.
 */
export class ValidationErrorsComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

  /**
   * Bind this property to the control for which you want to provide validation messages.
   */
  @Input() control: FormControl;

  /**
   * Enter the control label here, it will be used when formatting error messages
   */
  @Input() label: string;

  /**
   * The css class or comma-separated classes to apply to the container div.
   */
  @Input() containerCssClass: string = "validation-errors-container";
  /**
   * The css class or comma-separated classes to apply to the individual message divs.
   */
  @Input() messageCssClass: string = "error-message";

  /**
   * The id of the corresponding control, allows moving focus to the control.
   */
  @Input() id: string;

  /**
   * Returns an array of error messages (strings) for the current control.errors
   */
  get errorMessages(): string[] {
    let r = [];

    if (this.control && this.control.errors) {
      for (let key of Object.keys(this.control.errors)) {
        let msgFunc = ValidationErrorMessages.get(key);
        if (msgFunc != null) {
          let msg = msgFunc(this.label, this.control.errors[key]);
          r.push(msg);
        }
        else {
          let error = this.control.errors[key];
          if (typeof (error) === "string") {
            // the error value is a string directly so that we can add it to the messages
            let formattedError = sprintf(error, this.label);
            r.push(formattedError);
          }
          else if (typeof (error) === "function") {
            let formattedError = error(this.label);
            r.push(formattedError);
          }
          else if (typeof (error) === "object" && error.formatErrorMessage) {
            let formattedError = (<FormattableError>error).formatErrorMessage(error, this.label);
            r.push(formattedError);
          }
          else {
            console.log(`No error message for ${key}`);
          }
        }
      }
    }


    return r;
  }
}
