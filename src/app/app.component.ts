import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { NumberControlComponent } from './number-control/number-control.component';
import { GeneralControlMetadata } from './generalControl/generalControlMetadata';
import { TextInputControlBaseMetadata } from './textInputControlBase/textInputControlBaseMetadata';
import { DecimalControlMetadata } from './decimal-control/decimalControlMetadata';
import { IntegerControlMetadata } from './integer-control/integerControlMetadata';
import { StringControlMetadata } from './string-component/stringControlMetadata';
import { CheckboxControlMetadata } from './checkbox-control/checkboxControlMetadata';

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
  to: FormControl;
  year: FormControl;
  month: FormControl;
  firstName: FormControl;
  anotherNumber: FormControl;
  startYear: FormControl;
  lastName: FormControl;
  notifyViaMail: FormControl;


  formMetadata: { [name: string]: GeneralControlMetadata | TextInputControlBaseMetadata | DecimalControlMetadata | IntegerControlMetadata | StringControlMetadata | CheckboxControlMetadata } = {
    unitPrice: {
      type: "decimal",
      id: "unitPrice_id",
      name: "unitPrice_name",
      label: "Cena jednostkowa",
      isRequired: false,
      help: "Cena jednostkowa za towar bez uwzględnienia rabatów. Szczegóły <small><a href='http://global-solutions.pl'>Pomoc 21342</a></small>",
      min: 0,
      max: 100000,
      maxDecimalDigits: 2
    },
    startYear: {
      type: "integer",
      label: "Rok - początek",
      isRequired: true,
      help: "Rok początkowy <b>lorem ipsum</b> with html.",
      placeholder: "Rok początkowy",
      maxLength: 4,
      controlSize: "medium",
      min: 1900,
      max: 2100
    },
    lastName: {
      type: "string",
      label: "Nazwisko",
      isRequired: true,
      controlSize: "medium",
      maxLength: 20,
      minLength: 2
    },
    notifyViaMail: {
      type: "checkbox",
      label: "Wyślij e-mail",
      help: "Zaznacz aby otrzymywać powiadomienia poprzez e-mail.",
      additionalLabel: "Powiadomienia e-mail"
    }

  }

  createForm() {
    this.myForm = this.fb.group({
      firstNumber: [""],
      secondNumber: [2.34],
      from: [null],
      to: [2030],
      year: [2015],
      month: 2,
      firstName: "John",
      anotherNumber: [123],
      startYear: [2000],
      lastName: ["Smith"],
      notifyViaMail: [false]
    });

    this.secondNumber = <FormControl>this.myForm.controls["secondNumber"];
    this.from = <FormControl>this.myForm.controls["from"];
    this.to = <FormControl>this.myForm.controls["to"];
    this.year = <FormControl>this.myForm.controls["year"];
    this.month = <FormControl>this.myForm.controls["month"];
    this.firstName = <FormControl>this.myForm.controls["firstName"];
    this.anotherNumber = <FormControl>this.myForm.controls["anotherNumber"];
    this.startYear = <FormControl>this.myForm.controls["startYear"];
    this.lastName = <FormControl>this.myForm.controls["lastName"];
    this.notifyViaMail = <FormControl>this.myForm.controls["notifyViaMail"];
  }


  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  onSubmit = () => {
    console.log(`onSubmit() called.`);
    this.markFormGroupTouched(this.myForm);
    this.myForm.updateValueAndValidity();

    if (this.notifyViaMail.value) {
      this.myForm.setErrors({
        insufficient: "Wartość jest niewystarczająca.",
        unique_xxx: "Podane wartości są bez sensu!."
      });
    }

    if (this.myForm.valid) {
      console.log(`Form value: ${JSON.stringify(this.myForm.value)}`);
    }
    else {
      console.log(`Form invalid, submit cancelled.`);
    }

  }

  onCancel = () => {
    alert("Cancel called.");
  }

  setValue = () => {
    // this.numberControlComponent.min++;
    // console.log(`Increased min to: ${this.numberControlComponent.min}`);
    // this.numberControlComponent.isRequired = !this.numberControlComponent.isRequired;
    // console.log(`isRequired: ${this.numberControlComponent.isRequired}`);
    this.myForm.get('from').setErrors({ insufficient: "Wartość w polu '%s' jest niewystarczająca." });
    this.myForm.setErrors({
      insufficient: "Wartość jest niewystarczająca.", unique_xxx: "Podane wartości są bez sensu!."
    });

    this.markFormGroupTouched(this.myForm);
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
