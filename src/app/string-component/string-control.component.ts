import { Component, OnInit, forwardRef, ElementRef, Input, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { setControlError, removeControlError } from '../validationErrorHelpers';
import { TextInputControlBase } from '../textInputControlBase/textInputControlBase';
import { StringControlMetadata } from './stringControlMetadata';

/*
** TODO
** Pattern, PatternMessage
** Trim, TrimLeft
*/

@Component({
  selector: 'mko-string-control',
  templateUrl: './string-control.component.html',
  styleUrls: ['./string-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StringControlComponent),
      multi: true
    }
  ]
})
export class StringControlComponent extends TextInputControlBase implements OnInit, OnDestroy {
  static error_min_length: string = "min_length";

  constructor(host: ElementRef) {
    super(host);
  }

  ngOnInit() {
  }


  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  // #region public interface

  private _minLength: number = undefined;

  @Input() set minLength(v: number) {
    if (this._minLength != v) {
      this._minLength = v;
      this.updateInternalValidators();
    }
  }
  get minLength(): number {
    return this._minLength;
  }

  // #endregion public interface 

  // #region control state

  private value: string;

  // #endregion control state

  // #region internal validators

  private checkMinLength() {
    if (this.isEmpty || !this.value) return;

    let failed: boolean = false;

    if (this.minLength !== undefined) {
      failed = this.value.length < this.minLength;
    }

    if (failed) {
      let message = sprintf("Wartość w '%s' musi mieć co najmniej %d znaków.", this.label, this.minLength);
      setControlError(this.control, StringControlComponent.error_min_length, message);
    }
    else {
      removeControlError(this.control, StringControlComponent.error_min_length);
    }
  }

  // #endregion internal validators


  updateInternalValidators() {
    super.updateInternalValidators(); // this handles isEmpty

    this.checkMinLength();


  }


  updateValueAndState(rawValue: string | number | null): any {

    super.updateValueAndState(rawValue); // this determines isEmpty


    rawValue = rawValue.toString();

    this.value = rawValue;


    return this.value;

  }

  setMetadata(v: StringControlMetadata): void {
    super.setMetadata(v);
    if (v.minLength !== undefined) this.minLength = v.minLength;
  }
}
