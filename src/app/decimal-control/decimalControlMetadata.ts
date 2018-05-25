import { TextInputControlBaseMetadata } from "../textInputControlBase/textInputControlBaseMetadata";

export interface DecimalControlMetadata extends TextInputControlBaseMetadata {
    min?: number;
    max?: number;
    maxDecimalDigits?: number;
}