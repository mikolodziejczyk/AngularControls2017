
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationErrorMessages } from '../errorMessages/validationErrorMessages';
import { sprintf } from "sprintf-js"
import { format } from 'url';
import { FormattableError } from '../errorMessages/formattableError';
import { ErrorMessageFormatter } from '../errorMessages/errorMessageFormatter';

@Component({
  selector: 'mko-validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.less']
})
/**
 * Displays error messages in divs.
 */
export class ValidationErrorsComponent implements OnInit {

  constructor(private errorMessageFormatter: ErrorMessageFormatter) {

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
   * Use regular font instead of small one.
   */
  @Input() largeMessage: boolean = false;

  /**
   * Returns an array of error messages (strings) for the current control.errors
   */
  get errorMessages(): string[] {
    let r = [];

    if (this.control && this.control.errors) {
      r = Object.entries(this.control.errors)
            .map((pair) => 
                this.errorMessageFormatter.formatErrorMessage(pair[0], pair[1], this.label))
    }

    return r;
  }
}
