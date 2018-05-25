import { FormControl } from "@angular/forms";
import { GeneralControlMetadata } from "./controlMetadata/generalControlMetadata";

export interface GeneralControl {
    label: string;
    isRequired: boolean;
    help: string;
    id: string;
    name: string;
    control: FormControl;
    metadata: GeneralControlMetadata;
}