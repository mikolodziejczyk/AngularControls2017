import { TextInputControlBaseMetadata } from "../textInputControlBase/textInputControlBaseMetadata";

export interface IntegerControlMetadata extends TextInputControlBaseMetadata {
    min?: number;
    max?: number;
}