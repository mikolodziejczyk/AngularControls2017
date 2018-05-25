import { FormControl } from "@angular/forms";
import { GeneralControlMetadata } from "./generalControlMetadata";

export interface GeneralControl {
    label: string;
    isRequired: boolean;
    help: string;
    id: string;
    name: string;
    control: FormControl;
    metadata: GeneralControlMetadata;
}