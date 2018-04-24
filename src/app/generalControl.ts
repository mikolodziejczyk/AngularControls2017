import { FormControl } from "@angular/forms";

export interface GeneralControl {
    label: string;
    isRequired: boolean;
    help: string;
    id: string;
    control: FormControl;
}