import { TextInputControlBaseMetadata } from "../controlBase/textInputControlBaseMetadata";

export interface DecimalControlMetadata extends TextInputControlBaseMetadata {
    min?: number;
    max?: number;
    maxDecimalDigits?: number;
}