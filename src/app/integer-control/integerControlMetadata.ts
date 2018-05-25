import { TextInputControlBaseMetadata } from "../controlBase/textInputControlBaseMetadata";

export interface IntegerControlMetadata extends TextInputControlBaseMetadata {
    min?: number;
    max?: number;
}