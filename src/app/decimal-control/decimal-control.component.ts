import { Component, OnInit, OnDestroy, ElementRef, forwardRef, Input } from '@angular/core';
import { ControlBase } from '../controlBase';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { setControlError, removeControlError } from '../validationErrorHelpers';
import { localeParseInt } from '../numberHelpers/localeNumberParse';
import { formatNumberPlain } from '../numberHelpers/localeNumberFormat';

@Component({
  selector: 'mko-decimal-control',
  templateUrl: './decimal-control.component.html',
  styleUrls: ['./decimal-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DecimalControlComponent),
      multi: true
    }
  ]
})
export class DecimalControlComponent extends ControlBase implements OnInit, OnDestroy {
  static error_NaN: string = "notANumber";
  static error_min: string = "min";
  static error_max: string = "max";

  constructor(host: ElementRef) {
    super(host);
  }

  ngOnInit() {
  }


  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  // #region public interface

  private _min: number = undefined;

  @Input() set min(v: number) {
    if (this._min != v) {
      this._min = v;
      this.updateInternalValidators();
    }
  }
  get min(): number {
    return this._min;
  }

  private _max: number = undefined;
  @Input() set max(v: number) {
    if (this._max != v) {
      this._max = v;
      this.updateInternalValidators();
    }
  }
  get max(): number {
    return this._max;
  }

  // #endregion public interface 

  // #region control state

  private isNumber: boolean;
  private value: number;

  // #endregion control state

  // #region internal validators

  private checkMin() {
    if (this.isEmpty || !this.isNumber) return;

    let failed: boolean = false;

    if (this.min !== undefined) {
      failed = this.value < this.min
    }
    if (failed) {
      let message = sprintf("Wartość w '%s' musi być większa lub równa %s.", this.label, formatNumberPlain(this.min));
      setControlError(this.control, DecimalControlComponent.error_min, message);
    }
    else {
      removeControlError(this.control, DecimalControlComponent.error_min);
    }
  }

  private checkMax() {
    if (this.isEmpty || !this.isNumber) return;

    let failed: boolean = false;

    if (this.max !== undefined) {
      failed = (this.value > this.max);
    }

    if (failed) {
      let message = sprintf("Wartość w '%s' musi być mniejsza lub równa %s.", this.label, formatNumberPlain(this.max));
      setControlError(this.control, DecimalControlComponent.error_max, message);
    }
    else {
      removeControlError(this.control, DecimalControlComponent.error_max);
    }
  }

  // #endregion internal validators


  updateInternalValidators() {
    super.updateInternalValidators(); // this handles isEmpty

    if (!this.isNumber) {
      let message = sprintf("Wartość w polu '%s' musi być liczbą.", this.label);
      setControlError(this.control, DecimalControlComponent.error_NaN, message);
    }

    this.checkMin();

    this.checkMax();

  }


  updateValueAndState(rawValue: string | number | null): any {

    super.updateValueAndState(rawValue); // this determines isEmpty

    this.isNumber = true;

    if (rawValue && typeof (rawValue) !== "number") rawValue = rawValue.toString();

    if (typeof (rawValue) === "string") {
      if (!this.isEmpty) {
        this.value = localeParseInt(rawValue);
        this.isNumber = !isNaN(this.value);
        if (!this.isNumber) this.value = null;
      }
      else {
        this.value = null;
      }
    }
    else {
      this.value = rawValue;
    }

    return this.value;

  }


}