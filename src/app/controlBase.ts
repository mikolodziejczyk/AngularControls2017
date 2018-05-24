import { Input, ElementRef, OnDestroy } from "@angular/core";
import { FormControl, ControlValueAccessor } from "@angular/forms";
import { setControlError, removeControlError } from "./validationErrorHelpers";
import { GeneralControl } from "./generalControl";

export class ControlBase implements OnDestroy, ControlValueAccessor, GeneralControl {
    constructor(protected host: ElementRef) { }

    /**
     * Reference to FormControl, needs to be injected into this control.
     */
    @Input() control: FormControl;

    /**
     * The actual input element.
     */
    private _input: HTMLInputElement;

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

            // wire handlers here once the element is obtained
            this.addHandlers();
        }
        return this._input;
    }


    ngOnDestroy(): void {
        this.removeHandlers();
    }

    /**
     * Wires handlers to change, input, blur; to be called when the undlerlying is obtained for the first time
     */
    protected addHandlers(): void {
        this._input.addEventListener("change", this.onInput);
        this._input.addEventListener("input", this.onInput);
        this._input.addEventListener("blur", this.onBlur);
    }

    /**
     * Removes handlers wired to change, input, blur; to be called in ngOnDestroy
     */
    protected removeHandlers(): void {
        this.input.removeEventListener("change", this.onInput);
        this.input.removeEventListener("input", this.onInput);
        this.input.removeEventListener("blur", this.onBlur);
    }


    /**
     * Provides generic transformation from cooked value (e.g. number) into a string.
     * Should be overriden in derived classes as needed.
     * @param value - The cooked value for the control
     */
    protected valueToString(value: any) {
        return value ? value.toString() : "";
    }


    // #region ControlValueAccessor


    /**
     * ControlValueAccessor.writeValue() implementation, calls updateValueAndState()
     * @param obj - the new control value in any form supported by the control.
     */
    writeValue(obj: any): void {
        if (this.input) {
            this.input.value = this.valueToString(obj);

            window.setTimeout(() => {
                let rawValue: string = this.input.value;
                this.updateControl(rawValue, false);
            }, 0);

        }
        else {
            throw new Error("writeValue - input not ready yet.");
        }
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
    onInput = () => {
        let rawValue: string = this.input.value;
        this.updateControl(rawValue, true);
    }

    onBlur = () => {
        this.onTouched();
    }

    // #endregion event handlers

    // #region public interface

    /**
     * The label displayed for this control.
     */
    @Input() label: string;

    /**
     * The input.id in this control
     */
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

    @Input() help: string;

    // #endregion public interface


    // #region control state

    /**
     * Keeps information whether the control is empty.
     */
    protected isEmpty: boolean;

    // #endregion control state

    /**
     * On the basis of the control state determined by updateValueAndState() adds control errors.
     * Runs validators integrated with this control. Internal validators aren't Angular validators, they are just code adding / removing control errors.
     * The default implementation covers required only.
     * In the derived classes you add more validators.
     */
    updateInternalValidators() {
        if (this.isEmpty && this.isRequired) {
            setControlError(this.control, "required", true);
        }
        else {
            removeControlError(this.control, "required");
        }


    }

    /**
    * Updates the value of the control from a raw or cooked value, returns the new value.
    * The default implementation tests only for isEmpty.
    * In the derived class you add the value check.
    * @param rawValue 
    */

    updateValueAndState(rawValue: any | null | undefined): any {
        this.isEmpty = rawValue === null || rawValue === undefined || rawValue == "";

        return rawValue;
    }


    /**
     * Updates this control with a new value, then determines its new state and runs internal validators.
     * This method usually doesn't need to be overriden.
     * @param rawValue 
     * @param emitChange 
     */
    updateControl(rawValue: any | null | undefined, emitChange: boolean = false) {
        let cookedValue: any = this.updateValueAndState(rawValue);

        if (emitChange) {
            this.propagateChange(cookedValue);
        }

        this.updateInternalValidators();
    }


}