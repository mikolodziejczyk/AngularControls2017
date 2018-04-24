import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GeneralControl } from '../generalControl';

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
    if (this.help) {
      let helpHtml: string = this.help.replace(/(\r)?\n/g, "<br/>");

      $(this.helpIcon.nativeElement).popover({
        content: helpHtml,
        title: this.label,
        html: true,
        container: 'body'
      });
    }
  }

  private _label: string;
  private _id: string;
  private _help: string;
  private _control: FormControl;


  @Input() set label(v: string) { this._label = v; };
  get label(): string {
    return this._label || this.generalControl.label;
  }
  
  @Input() set id(v: string) { this._id = v; };
  get id(): string {
    return this._id || this.generalControl.id;
  }

  @Input() set help(v: string) { this._help = v; };
  get help(): string {
    return this._help || this.generalControl.help;
  }

  @Input() set control(v: FormControl) {this._control = v;};
  get control(): FormControl {
    return this._control || this.generalControl.control;
  }

  @Input() generalControl: GeneralControl;
}
