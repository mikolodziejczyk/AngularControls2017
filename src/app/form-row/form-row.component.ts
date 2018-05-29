import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GeneralControl } from '../generalControl/generalControl';
import { BootstrapHtmlHelpers } from '../bootstrapHtmlHelpers';
// import  "@types/jquery"
// import  "@types/bootstrap"
// /// <reference types="jquery"/>
// /// <reference types="bootstrap"/>

@Component({
  selector: 'mko-form-row',
  templateUrl: './form-row.component.html',
  styleUrls: ['./form-row.component.less']
})
export class FormRowComponent implements OnInit, AfterViewInit {

  constructor() { }

  @ViewChild('helpIcon')
  private helpIcon: ElementRef;


  ngOnInit() {
  }

  ngAfterViewInit() {
    this.setupPopover();
  }

  private _label: string;
  private _id: string;
  private _help: string;
  private _control: FormControl;


  @Input() set label(v: string) { this._label = v; };
  get label(): string {
    return this._label || this.generalControl ? this.generalControl.label : null;
  }

  @Input() set id(v: string) { this._id = v; };
  get id(): string {
    return this._id || this.generalControl ? this.generalControl.id : null;
  }

  @Input() set help(v: string) { 
    this._help = v;
    this.updatePopoverIfNeeded();
  };
  get help(): string {
    return this._help || this.generalControl ? this.generalControl.help : null;
  }

  @Input() set control(v: FormControl) { 
    this._control = v;
    this.updatePopoverIfNeeded();
   };
  get control(): FormControl {
    return this._control || this.generalControl ? this.generalControl.control : null;
  }

  _generalControl: GeneralControl;

  @Input() set generalControl(v: GeneralControl) { 
    this._generalControl = v;
    this.updatePopoverIfNeeded();
   };
  get generalControl(): GeneralControl {
    return this._generalControl;
  }
  

  private _isPopoverInitialized: boolean = false;
  private _currentPopoverHelp: string = null;

  private updatePopoverIfNeeded() {
    let hasHelpChanged = this._currentPopoverHelp != this.help;
    if (hasHelpChanged) this.setupPopover();
  }

  private setupPopover() {
    if (this._isPopoverInitialized) {
      jQuery(this.helpIcon.nativeElement).popover('destroy');
    }

    if (this.help) {
      let helpHtml: string = this.help.replace(/(\r)?\n/g, "<br/>");

      jQuery(this.helpIcon.nativeElement).popover({
        content: helpHtml,
        title: this.label,
        html: true,
        container: 'body'
      });

      this._isPopoverInitialized = false;
      this._currentPopoverHelp = this.help;
    }
  }

  public labelClass : string = BootstrapHtmlHelpers.editLabelClass;
  public valueClass : string = BootstrapHtmlHelpers.editValueClass;
}
