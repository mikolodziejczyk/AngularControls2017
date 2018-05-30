import { NumberControlComponent } from './number-control/number-control.component';
import { GeneralControlMetadata } from './generalControl/generalControlMetadata';
import { TextInputControlBaseMetadata } from './textInputControlBase/textInputControlBaseMetadata';
import { DecimalControlMetadata } from './decimal-control/decimalControlMetadata';
import { IntegerControlMetadata } from './integer-control/integerControlMetadata';
import { StringControlMetadata } from './string-component/stringControlMetadata';
import { CheckboxControlMetadata } from './checkbox-control/checkboxControlMetadata';

export type AnyControlMetadata = GeneralControlMetadata | TextInputControlBaseMetadata | DecimalControlMetadata | IntegerControlMetadata | StringControlMetadata | CheckboxControlMetadata;
export type ControlsMetadata = { [name: string]: AnyControlMetadata }

export interface FormMetadata {
    controls: ControlsMetadata;
    navigation?: Navigation;
}

export interface Navigation {
    okUrl?: string;
    cancelUrl?: string;
}