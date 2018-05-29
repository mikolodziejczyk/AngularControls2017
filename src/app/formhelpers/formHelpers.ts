import { FormGroup } from "@angular/forms";

  /**
 * Marks all controls in a form group as touched
 * @param formGroup The group to process.
 */
export function markFormGroupTouched(formGroup: FormGroup) {

    formGroup.markAsTouched(); // mark the FormGroup itself as touched

    Object.keys(formGroup.controls).map(x => formGroup.controls[x]).forEach(control => {
      control.markAsTouched();

      // process nested FormGroups, recursively -- this part is not tested
      if ((<FormGroup>control).controls) {
        let nestedFg = (<FormGroup>control);
        Object.keys(nestedFg.controls).map(x => nestedFg.controls[x]).forEach(c => this.markFormGroupTouched(nestedFg));
      }
    });
  }