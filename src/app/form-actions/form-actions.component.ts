import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BootstrapHtmlHelpers } from '../bootstrapHtmlHelpers';

@Component({
  selector: 'mko-form-actions',
  templateUrl: './form-actions.component.html',
  styleUrls: ['./form-actions.component.less']
})
export class FormActionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  columnClass = BootstrapHtmlHelpers.editLabelOffsetClass + " " + BootstrapHtmlHelpers.editLabelClass;

  @Input() saveText: string = "Zapisz";
  @Input() cancelText: string = "Anuluj"

  @Input() isSaving: boolean = false;
  @Input() isCancelling: boolean = false;

  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
}
