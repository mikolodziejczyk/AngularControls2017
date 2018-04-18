import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ValidationErrors } from '@angular/forms';
import { removeControlError, setControlError } from '../validationErrorHelpers';

@Component({
  selector: 'app-number-control',
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
export class NumberControlComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  static not_a_number_error: string = "notANumber";
  static less_than_min_error: string = "min";
  static more_than_max_error: string = "max";

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
        this.updateInternalState(rawValue, false);
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

    // let v = this.input.nativeElement.value;
    // console.log(`The value is ${v}`);

    // if (!v) {
    //   if (this.isRequired) {
    //     setControlError(this.control, "required", true);
    //     console.log("Adding required error.");
    //   }
    //   this.propagateChange(null);
    // }
    // else {
    //   removeControlError(this.control, "required");
    //   console.log("Removing required error");
    //   let r = this.verifyAndParseNumber(v);
    //   if (r != null) {
    //     this.applyMinMax(r);
    //   }
    //   console.log(`Errors before propagateChange: verifyAndParseNumber`);
    //   console.log(this.control.errors);
    //   if (r) this.propagateChange(r); else this.propagateChange(NaN);

    // }
    // console.log(`Errors after propagateChange: verifyAndParseNumber`);
    // console.log(this.control.errors);

    let rawValue: string = this.input.nativeElement.value;
    this.updateInternalState(rawValue, true);

    // let isEmpty = !rawValue;
    // let isNumber: boolean = true;
    // let cooked: number;
    // if (!isEmpty) {
    //   isNumber = /^\d+$/.test(rawValue);
    //   cooked = parseInt(rawValue);
    //   isNumber = isNumber && !isNaN(cooked);
    //   if (!isNumber) cooked = null;
    // }
    // else {
    //   cooked = null;
    // }


    // this.propagateChange(cooked);

    // if (isEmpty && this.isRequired) setControlError(this.control, "required", true);
    // if (!isNumber) setControlError(this.control, NumberControlComponent.not_a_number_error, true);
  }



  onBlur() {
    console.log("onTouched called");
    this.onTouched();
  }

  verifyAndParseNumber(v: string): number {
    let isNumber = /^\d+$/.test(v);
    let cooked = parseInt(v);
    if (isNumber && !isNaN(cooked)) {
      console.log(`Removing not_a_number_error.`);
      removeControlError(this.control, NumberControlComponent.not_a_number_error);
    }
    else {
      cooked = null;
      console.log(`Adding ${NumberControlComponent.not_a_number_error}.`);
      setControlError(this.control, NumberControlComponent.not_a_number_error, true);
      console.log(`Errors from: verifyAndParseNumber`);
      console.log(this.control.errors);
    }

    return cooked;
  }

  applyMinMax(v: number): boolean {
    let r: boolean = true;

    if (this.min) {
      if (v < this.min) {
        setControlError(this.control, NumberControlComponent.less_than_min_error, true);
        r = false;
      }
      else {
        removeControlError(this.control, NumberControlComponent.less_than_min_error);
      }
    }

    return r;
  }

  @Input() label: string;
  @Input() isRequired: boolean = false;
  @Input() min: number = undefined;
  @Input() max: number = undefined;

  updateInternalState(rawValue: string | number | null, emitChange: boolean = false) {
    console.log(`updateInternalState - called with ${rawValue}.`);
    this.isEmpty = rawValue === null || rawValue === undefined || rawValue == "";
    this.isNumber = true;

    if (typeof (rawValue) === "string") {
      if (!this.isEmpty) {
        this.isNumber = /^\d+$/.test(rawValue);
        this.value = parseInt(rawValue);
        this.isNumber = this.isNumber && !isNaN(this.value);
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

    if (this.isEmpty && this.isRequired) setControlError(this.control, "required", true);
    if (!this.isNumber) setControlError(this.control, NumberControlComponent.not_a_number_error, true);
  }


  isNumber: boolean;
  isEmpty: boolean;
  value: number;
}
