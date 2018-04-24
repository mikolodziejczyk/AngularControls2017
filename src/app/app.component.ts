import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { NumberControlComponent } from './number-control/number-control.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.formSubscription = this.myForm.valueChanges.subscribe((v) => console.log(`Form value ${JSON.stringify(v)}`));
  }

  @ViewChild("numberComponent") numberControlComponent: NumberControlComponent;

  myForm: FormGroup;
  formSubscription: Subscription;
  secondNumber: FormControl;
  from: FormControl;

  createForm() {
    this.myForm = this.fb.group({
      firstNumber: [""],
      secondNumber: [null],
      from: [null]
    });

    this.secondNumber = <FormControl>this.myForm.controls["secondNumber"];
    this.from = <FormControl>this.myForm.controls["from"];
  }


  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  onSubmit = () => {
    console.log(`onSubmit() called.`);
    this.markFormGroupTouched(this.myForm);
    this.myForm.updateValueAndValidity();
    if (this.myForm.valid) {
      console.log(`Form value: ${JSON.stringify(this.myForm.value)}`);
    }
    else {
      console.log(`Form invalid, submit cancelled.`);
    }

  }

  setValue = () => {
    // this.numberControlComponent.min++;
    // console.log(`Increased min to: ${this.numberControlComponent.min}`);
    // this.numberControlComponent.isRequired = !this.numberControlComponent.isRequired;
    // console.log(`isRequired: ${this.numberControlComponent.isRequired}`);
    this.myForm.get('from').setErrors({insufficient: "The value is insufficient."});
  }

  /**
 * Marks all controls in a form group as touched
 * @param formGroup The group to process.
 */
  private markFormGroupTouched(formGroup: FormGroup) {

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

}
