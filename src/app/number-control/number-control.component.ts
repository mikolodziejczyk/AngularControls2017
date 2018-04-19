import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ValidationErrors } from '@angular/forms';
import { removeControlError, setControlError } from '../validationErrorHelpers';
import { WSAVERNOTSUPPORTED } from 'constants';

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

    let rawValue: string = this.input.nativeElement.value;
    this.updateInternalState(rawValue, true);
  }



  onBlur() {
    console.log("onTouched called");
    this.onTouched();
  }


  @Input() label: string;

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

  updateInternalValidators() {
    if (this.isEmpty && this.isRequired) {
      setControlError(this.control, "required", true);
    }
    else {
      removeControlError(this.control, "required");
    }

    if (!this.isNumber) {
      setControlError(this.control, NumberControlComponent.not_a_number_error, true);
    }


    if (!this.isEmpty && this.isNumber) {

      if (this.min) {
        if (this.value < this.min) {
          setControlError(this.control, NumberControlComponent.less_than_min_error, true)
        }
        else {
          removeControlError(this.control, NumberControlComponent.less_than_min_error);
        }
      }

      if (this.max) {
        if (this.value > this.max) {
          setControlError(this.control, NumberControlComponent.more_than_max_error, true)
        } else {
          removeControlError(this.control, NumberControlComponent.more_than_max_error);
        }
      }
    }
  }

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

    this.updateInternalValidators();

  }


  isNumber: boolean;
  isEmpty: boolean;
  value: number;
}
