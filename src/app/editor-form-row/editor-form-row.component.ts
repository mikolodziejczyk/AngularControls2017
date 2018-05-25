import { Component, OnInit, Input, ViewChild, AfterContentInit } from '@angular/core';
import { DecimalControlComponent } from '../decimal-control/decimal-control.component';
import { FormControl } from '@angular/forms';
import { GeneralControlMetadata } from '../controlMetadata/generalControlMetadata';
import { TextInputControlBase } from '../controlBase/textInputControlBase';

@Component({
  selector: 'mko-editor-form-row',
  templateUrl: './editor-form-row.component.html',
  styleUrls: ['./editor-form-row.component.css']
})
export class EditorFormRowComponent implements OnInit, AfterContentInit {
  constructor() {
    this.applyMetadata(this.metadata);
   }

  ngOnInit() {
    
  }

  metadata : GeneralControlMetadata = {
    id : "xxxx",
    label : "Jakaś wartość",
    isRequired: false,
    type: "decimal",
    help: "Cena jednostkowa za towar bez uwzględnienia rabatów. Szczegóły <small><a href='http://global-solutions.pl'>Pomoc 21342</a></small>"
  };

  ngAfterContentInit(): void {

  }

  @ViewChild("editor") editor: TextInputControlBase;

  @Input() public boundFormControl: FormControl;

  get type(): string {
    return this.metadata.type;
  }

  get isDecimal() : boolean {
    return true; // this.metadata.type == "decimal";
  }

  applyMetadata(metadata: GeneralControlMetadata) {
    this.editor.label = metadata.label;
    this.editor.isRequired = metadata.isRequired;
    this.editor.id = metadata.id;
    this.editor.help = metadata.help || null;
  }
}
