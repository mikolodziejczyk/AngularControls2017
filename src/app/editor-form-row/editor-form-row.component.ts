import { Component, OnInit, Input, ViewChild, AfterContentInit } from '@angular/core';
import { DecimalControlComponent } from '../decimal-control/decimal-control.component';
import { FormControl, FormsModule } from '@angular/forms';
import { GeneralControlMetadata } from '../generalControl/generalControlMetadata';
import { TextInputControlBase } from '../textInputControlBase/textInputControlBase';
import { FormRowComponent } from '../form-row/form-row.component';
import { GeneralControl } from '../generalControl/generalControl';

@Component({
  selector: 'mko-editor-form-row',
  templateUrl: './editor-form-row.component.html',
  styleUrls: ['./editor-form-row.component.css']
})
export class EditorFormRowComponent implements OnInit, AfterContentInit {
  constructor() {

   }

  ngOnInit() {
    
  }

  @Input() metadata : GeneralControlMetadata;

  ngAfterContentInit(): void {
    window.setTimeout(() => {
      this.formRow.generalControl = this.editor;
    }, 0);
  }

  @ViewChild("editor") editor: GeneralControl;

  @ViewChild("formRow") formRow: FormRowComponent;

  @Input() public boundFormControl: FormControl;

  get isDecimal() : boolean {
    return this.metadata.type == "decimal";
  }

  get isInteger() : boolean {
    return this.metadata.type == "integer";
  }

  get isString() : boolean {
    return this.metadata.type == "string";
  }

  get isCheckbox() : boolean {
    return this.metadata.type == "checkbox";
  }
}
