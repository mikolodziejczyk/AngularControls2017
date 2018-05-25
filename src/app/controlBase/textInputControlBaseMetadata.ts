import { GeneralControlMetadata } from "../controlMetadata/generalControlMetadata";

export interface TextInputControlBaseMetadata extends GeneralControlMetadata {
    placeholder?: string;
    maxLength?: number;
    controlSize?: "small" | "medium" | "large";
}