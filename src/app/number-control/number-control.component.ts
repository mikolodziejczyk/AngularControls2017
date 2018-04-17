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
    if (obj && this.input) {
      this.input.nativeElement.value = obj.toString();
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
    console.log("propagateChange called");

    let v = this.input.nativeElement.value;

    if (!v) {
      if (this.required) {
        setControlError(this.control, "required", true);
      }
      else {
        this.propagateChange(null);
      }
    }
    else {
      removeControlError(this.control, "required");
      let r = this.verifyAndParseNumber(v);
      if (r != null) {
        let shouldUpdate: boolean = this.applyMinMax(r);
        if (shouldUpdate) {
          this.propagateChange(r);
        }
      }
    }



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
      this.propagateChange(cooked);
    }
    else {
      cooked = null;
      console.log(`Adding ${NumberControlComponent.not_a_number_error}.`);
      setControlError(this.control, NumberControlComponent.not_a_number_error, true);
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
  @Input() required: boolean = false;
  @Input() min: number = undefined;
  @Input() max: number = undefined;
}
