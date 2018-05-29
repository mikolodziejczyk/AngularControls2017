import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BootstrapHtmlHelpers } from '../bootstrapHtmlHelpers';


@Component({
  selector: 'mko-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.less']
})
/**
 * Displays group errors in a bootstrap alert.
 */
export class FormErrorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /**
   * The control (usually a FormGroup) to display errors for.
   */
  @Input() control: FormControl;
  
  columnClass = BootstrapHtmlHelpers.editLabelOffsetClass + " " + BootstrapHtmlHelpers.editLabelClass;

}
