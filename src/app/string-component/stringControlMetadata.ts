import { TextInputControlBaseMetadata } from "../controlBase/textInputControlBaseMetadata";

export interface StringControlMetadata extends TextInputControlBaseMetadata {
    minLength?: number;
}