import { Component, OnInit, forwardRef, Input, ViewChild, ElementRef, ContentChild, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { setControlError, removeControlError } from '../validationErrorHelpers';
import { roundAwayFromZero } from '../numberHelpers/numberHelpers';
import { localePaseFloat } from '../numberHelpers/localeNumberParse';
import { formatNumberPlain } from '../numberHelpers/localeNumberFormat';

@Component({
  selector: 'mko-integer-control',
  templateUrl: './integer-control.component.html',
  styleUrls: ['./integer-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IntegerControlComponent),
      multi: true
    }
  ]
})
export class IntegerControlComponent implements OnInit, OnDestroy {

  static error_NaN: string = "notANumber";
  static error_min: string = "min";
  static error_max: string = "max";
  static error_maxDecimalDigits: string = "maxDecimalDigits";

  constructor(private host: ElementRef) { }

  @Input() control: FormControl;

  @ViewChild("wrapper") wrapper: ElementRef;

  _input: HTMLInputElement;

  /**
   * Gets a reference to the input element by finding it in the html tree, creates one if needed.
   */
  get input(): HTMLInputElement {
    if (!this._input) {
      this._input = (<HTMLSpanElement>this.host.nativeElement).querySelector("input");

      if (!this._input) {
        (<HTMLSpanElement>this.host.nativeElement).innerHTML = '<input type="text" class="form-control"/>';
        this._input = (<HTMLSpanElement>this.host.nativeElement).querySelector("input");
      }

      this._input.addEventListener("change", this.onInput);
      this._input.addEventListener("input", this.onInput);
      this._input.addEventListener("blur", this.onBlur);
    }
    return this._input;
  }

 
  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.input.removeEventListener("change", this.onInput);
    this.input.removeEventListener("input", this.onInput);
    this.input.removeEventListener("blur", this.onBlur);
  }

  writeValue(obj: any): void {
    if (this.input) {
      this.input.value = obj ? obj.toString() : "";

      window.setTimeout(() => {
        let rawValue: string = this.input.value;
        this.updateValueAndState(rawValue, false);
      }, 0);

    }
    else {
      throw new Error("writeValue - input not ready yet.");
    }
  }

  propagateChange = (_: any) => { };


  registerOnChange(fn: any): void {

    this.propagateChange = fn;
  }

  onTouched = () => { };


  registerOnTouched(fn: any): void {

    this.onTouched = fn;
  }


  setDisabledState(isDisabled: boolean): void {

    this.input.disabled = isDisabled;
  }

  onInput = () => {

    let rawValue: string = this.input.value;
    this.updateValueAndState(rawValue, true);
  }

  onBlur = () => {

    this.onTouched();
  }


  @Input() label: string;


  @Input() set id(v: string) {
    this.input.id = v
  }
  get id(): string {
    return this.input.id;
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
      setControlError(this.control, IntegerControlComponent.error_NaN, message);
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
      setControlError(this.control, IntegerControlComponent.error_min, message);
    }
    else {
      removeControlError(this.control, IntegerControlComponent.error_min);
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
      setControlError(this.control, IntegerControlComponent.error_max, message);
    }
    else {
      removeControlError(this.control, IntegerControlComponent.error_max);
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
      setControlError(this.control, IntegerControlComponent.error_maxDecimalDigits, message);
    }
    else {
      removeControlError(this.control, IntegerControlComponent.error_maxDecimalDigits);
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
