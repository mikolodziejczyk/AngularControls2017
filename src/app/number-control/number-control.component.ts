import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ValidationErrors } from '@angular/forms';
import { removeControlError, setControlError } from '../validationErrorHelpers';
import { WSAVERNOTSUPPORTED } from 'constants';
import { localePaseFloat } from '../numberHelpers/localeNumberParse';
import { sprintf } from "sprintf-js"
import { roundAwayFromZero } from '../numberHelpers/numberHelpers';
import { formatNumberPlain } from '../numberHelpers/localeNumberFormat';
import { element } from 'protractor';
import { GeneralControl } from '../generalControl/generalControl';
import { GeneralControlMetadata } from '../generalControl/generalControlMetadata';

// TODO: 
// try to obtain control from a directive rather than from a binding - unclear whether possible
// consider locale separator
// two modes - integer and decimal - not modifiable
// error helpers as DI class to allow unit testing

// v id property - take and set id of the input (note how to set)
// v min / max error messages should return formatted number but with any number of decimal digits
// v move parsing the number to a separate class
// v errors as strings with spritf
// v improve regex - allow a minus sign
// v decimalDigits input property
// v add support for the change event to respond to other change source
// v setting min/max to undefined should clear errors
// v refactor validation into separate methods


@Component({
  selector: 'mko-number-control',
  templateUrl: './number-control.component.html',
  styleUrls: ['./number-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberControlComponent),
      multi: true
    }
  ]
})
export class NumberControlComponent implements ControlValueAccessor, GeneralControl, OnInit, AfterViewInit {
  name: string;
  metadata: GeneralControlMetadata;
  
  static error_NaN: string = "notANumber";
  static error_min: string = "min";
  static error_max: string = "max";
  static error_maxDecimalDigits: string = "maxDecimalDigits";

  constructor() { }

  @Input() control: FormControl;

  @ViewChild("input") input: ElementRef;


  ngOnInit() {
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
  }


  writeValue(obj: any): void {
    console.log("writeValue called");
    if (this.input) {
      this.input.nativeElement.value = obj ? obj.toString() : "";

      window.setTimeout(() => {
        let rawValue: string = this.input.nativeElement.value;
        this.updateValueAndState(rawValue, false);
      }, 0);

    }
    else {
      console.log("writeValue - input not ready yet.");
    }
  }

  propagateChange = (_: any) => { };


  registerOnChange(fn: any): void {
    console.log("registerOnChange called");
    this.propagateChange = fn;
  }

  onTouched = () => { };


  registerOnTouched(fn: any): void {
    console.log("registerOnTouched called");
    this.onTouched = fn;
  }


  setDisabledState(isDisabled: boolean): void {
    console.log("setDisabledState called");
    this.input.nativeElement.disabled = isDisabled;
  }

  onInput() {
    console.log("onInput called");

    let rawValue: string = this.input.nativeElement.value;
    this.updateValueAndState(rawValue, true);
  }



  onBlur() {
    console.log("onTouched called");
    this.onTouched();
  }


  @Input() label: string;


  @Input() set id(v: string) {
    this.input.nativeElement.id = v
  }
  get id(): string {
    return this.input.nativeElement.id;
  }


  private _isRequired: boolean = false;

  @Input() set isRequired(v: boolean) {
    if (this._isRequired != v) {
      this._isRequired = v;
      this.updateInternalValidators();
    }
  }
  get isRequired(): boolean {
    return this._isRequired;
  }

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

  @Input() help;

  updateInternalValidators() {
    if (this.isEmpty && this.isRequired) {
      setControlError(this.control, "required", true);
    }
    else {
      removeControlError(this.control, "required");
    }

    if (!this.isNumber) {
      let message = sprintf("Wartość w polu '%s' musi być liczbą.", this.label);
      setControlError(this.control, NumberControlComponent.error_NaN, message);
    }

    this.checkMin();

    this.checkMax();

    this.checkMaxDecimalDigits();

  }

  private checkMin() {
    if (this.isEmpty || !this.isNumber) return;

    let failed: boolean = false;

    if (this.min !== undefined) {
      failed = this.value < this.min
    }
    if (failed) {
      let message = sprintf("Wartość w '%s' musi być większa lub równa %s.", this.label, formatNumberPlain(this.min));
      setControlError(this.control, NumberControlComponent.error_min, message);
    }
    else {
      removeControlError(this.control, NumberControlComponent.error_min);
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
      setControlError(this.control, NumberControlComponent.error_max, message);
    }
    else {
      removeControlError(this.control, NumberControlComponent.error_max);
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
      setControlError(this.control, NumberControlComponent.error_maxDecimalDigits, message);
    }
    else {
      removeControlError(this.control, NumberControlComponent.error_maxDecimalDigits);
    }
  }

  updateValueAndState(rawValue: string | number | null, emitChange: boolean = false) {
    console.log(`updateInternalState - called with ${rawValue}.`);
    this.isEmpty = rawValue === null || rawValue === undefined || rawValue == "";
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

    if (emitChange) {
      this.propagateChange(this.value);
    }

    this.updateInternalValidators();

  }


  private isNumber: boolean;
  private isEmpty: boolean;
  private value: number;
}
