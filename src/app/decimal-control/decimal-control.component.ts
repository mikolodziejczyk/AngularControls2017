import { Component, OnInit, OnDestroy, ElementRef, forwardRef, Input } from '@angular/core';
import { TextInputControlBase } from '../textInputControlBase/textInputControlBase';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { setControlError, removeControlError } from '../validationErrorHelpers';
import { localeParseInt, localePaseFloat } from '../numberHelpers/localeNumberParse';
import { formatNumberPlain, formatNumber } from '../numberHelpers/localeNumberFormat';
import { roundAwayFromZero } from '../numberHelpers/numberHelpers';
import { DecimalControlMetadata } from './decimalControlMetadata';

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
export class DecimalControlComponent extends TextInputControlBase implements OnInit, OnDestroy {
  static error_NaN: string = "notANumber";
  static error_min: string = "min";
  static error_max: string = "max";
  static error_maxDecimalDigits: string = "maxDecimalDigits";

  constructor(host: ElementRef) {
    super(host);
  }

  ngOnInit() {
    if (!this.maxLength || this.maxLength===-1) this.maxLength = 12;
    if (!this.controlSize) this.controlSize = "small";
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

  private _maxDecimalDigits: number | undefined = undefined;

  @Input() set maxDecimalDigits(v: number) {
    if (this._maxDecimalDigits != v) {
      this._maxDecimalDigits = v;
      this.updateInternalValidators();
    }
  }
  get maxDecimalDigits(): number {
    return this._maxDecimalDigits;
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


  private checkMaxDecimalDigits() {
    if (this.isEmpty || !this.isNumber) return;

    let maxDecimalDigitsFailed: boolean = false;
    if (this.maxDecimalDigits !== undefined) {
      let rounded = roundAwayFromZero(this.value, this.maxDecimalDigits);
      maxDecimalDigitsFailed = (rounded != this.value);
    }
    if (maxDecimalDigitsFailed) {
      let message = sprintf("W '%s' możesz podać do %d miejsc po przecinku.", this.label, this.maxDecimalDigits);
      setControlError(this.control, DecimalControlComponent.error_maxDecimalDigits, message);
    }
    else {
      removeControlError(this.control, DecimalControlComponent.error_maxDecimalDigits);
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

    this.checkMaxDecimalDigits();

  }


  updateValueAndState(rawValue: string | number | null): any {

    super.updateValueAndState(rawValue); // this determines isEmpty

    this.isNumber = true;

    if (rawValue && typeof (rawValue) !== "number") rawValue = rawValue.toString();

    if (typeof (rawValue) === "string") {
      if (!this.isEmpty) {
        this.value = localePaseFloat(rawValue);
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

  protected valueToString(value: any) {
    let r: string = "";
    if (value) {
      if (typeof (value) == "number") {
        r = formatNumberPlain(value);
      }
      else if (typeof (value) == "string") {
        r = value;
      }
      else {
        r = value.toString();
      }
    }
    
    return r;
  }

  setMetadata(v : DecimalControlMetadata) : void {
    super.setMetadata(v);
    if (v.min!==undefined) this.min = v.min;
    if (v.max!==undefined) this.max = v.max;
    if (v.maxDecimalDigits!==undefined) this.maxDecimalDigits = v.maxDecimalDigits;
  }
}
