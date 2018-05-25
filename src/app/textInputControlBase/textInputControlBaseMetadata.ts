import { GeneralControlMetadata } from "../generalControl/generalControlMetadata";

export interface TextInputControlBaseMetadata extends GeneralControlMetadata {
    placeholder?: string;
    maxLength?: number;
    controlSize?: "small" | "medium" | "large";
}