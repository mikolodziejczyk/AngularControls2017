import { Component, OnInit, AfterContentInit, OnDestroy, ViewChild, ElementRef, Input, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxControlMetadata } from './checkboxControlMetadata';
import { GeneralControlMetadata } from '../generalControl/generalControlMetadata';
import { uniqueControlIdGenerator } from '../uniqueControlIdGenerator';

@Component({
  selector: 'mko-checkbox-control',
  templateUrl: './checkbox-control.component.html',
  styleUrls: ['./checkbox-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxControlComponent),
      multi: true
    }
  ]
})
export class CheckboxControlComponent implements OnInit, AfterContentInit, OnDestroy, ControlValueAccessor {

  constructor() { }

  /**
   * The actual input element.
   */
  @ViewChild("checkbox")
  private _inputWrapper: ElementRef;

  private get input(): HTMLInputElement{
    return this._inputWrapper.nativeElement;
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.addHandlers();
  }

  ngOnDestroy(): void {
    this.removeHandlers();
  }

  /**
   * Wires handlers to change, input, blur; to be called when the undlerlying is obtained for the first time
   */
  protected addHandlers(): void {
    this.input.addEventListener("click", this.onClick);
    this.input.addEventListener("blur", this.onBlur);
  }

  /**
   * Removes handlers wired to change, input, blur; to be called in ngOnDestroy
   */
  protected removeHandlers(): void {
    this.input.removeEventListener("click", this.onClick);
    this.input.removeEventListener("blur", this.onBlur);
  }


  // #region ControlValueAccessor


  /**
   * ControlValueAccessor.writeValue() implementation, calls updateValueAndState()
   * @param obj - the new control value in any form supported by the control.
   */
  writeValue(obj: any): void {
    this.input.checked = obj;
  }

  /**
   * A part of ControlValueAccessor implementation, keeps the method passed by registerOnChange
   */
  propagateChange = (_: any) => { };


  /**
   * ControlValueAccessor.registerOnChange implementation
   * @param fn 
   */
  registerOnChange(fn: any): void {

    this.propagateChange = fn;
  }

  /**
  * A part of ControlValueAccessor implementation, keeps the method passed by registerOnTouched
  */
  onTouched = () => { };

  /**
   * ControlValueAccessor.registerOnTouched() implementation
   * @param fn 
   */
  registerOnTouched(fn: any): void {

    this.onTouched = fn;
  }

  /**
   * ControlValueAccessor.setDisabledState() implementation
   * @param isDisabled 
   */
  setDisabledState(isDisabled: boolean): void {
    this.input.disabled = isDisabled;
  }


  // #endregion ControlValueAccessor

  // #region event handers

  /**
   * Reacts to both change and input events
   */
  onClick = () => {
    this.propagateChange(this.input.checked);
  }

  onBlur = () => {
    this.onTouched();
  }

  // #endregion event handlers


  
    // #region GeneralControl interface

    /**
     * Reference to FormControl, needs to be injected into this control.
     */
    @Input() control: FormControl;


    /**
     * The label displayed for this control.
     */
    @Input() label: string;

    /**
     * The input.id in this control
     */
    @Input() id: string;


    /**
     * Ignored in this control.
     */
    @Input() isRequired: boolean = false;

    @Input() help: string;


    /**
     * The input.name in this control
     */
    @Input() name: string;

    protected _metadata: CheckboxControlMetadata;

    @Input() set metadata(v: GeneralControlMetadata) {
        if (!v) return;
        this.setMetadata(v);

    }
    get metadata(): GeneralControlMetadata {
        return this._metadata;
    }

    /**
     * Internal metadata set method. Allows overriding in the derived classes.
     */
    protected setMetadata(v: GeneralControlMetadata): void {
        let hasMetatadaChanged: boolean = this._metadata != v;
        this._metadata = <CheckboxControlMetadata>v;

        this.label = this._metadata.label;
        this.id = this._metadata.id || uniqueControlIdGenerator.getId();
        if (this._metadata.name !== undefined) this.name = this._metadata.name;
        this.help = this._metadata.help || null;
        this.additionalLabel = this._metadata.additionalLabel || null;

        
    }

    // #endregion GeneralControl interface

    @Input() additionalLabel: string;

}
