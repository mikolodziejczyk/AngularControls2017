import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { NumberControlComponent } from '../number-control/number-control.component';
import { GeneralControlMetadata } from '../generalControl/generalControlMetadata';
import { TextInputControlBaseMetadata } from '../textInputControlBase/textInputControlBaseMetadata';
import { DecimalControlMetadata } from '../decimal-control/decimalControlMetadata';
import { IntegerControlMetadata } from '../integer-control/integerControlMetadata';
import { StringControlMetadata } from '../string-component/stringControlMetadata';
import { CheckboxControlMetadata } from '../checkbox-control/checkboxControlMetadata';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.createForm();
    this.formSubscription = this.myForm.valueChanges.subscribe((v) => console.log(`Form value ${JSON.stringify(v)}`));
    this.loadData();
  }

  ngOnInit() {
  }

  async loadData() {
    try {
      let o = this.http.get<any>("assets/my-form-metadata.json");
      this.formMetadata  = await o.toPromise();
      this.controlMetadata = this.formMetadata.controls;
      console.log("Metadata loaded");

    }
    catch (ex) {
      console.log("Error " + ex);
    }
  }
  

  @ViewChild("numberComponent") numberControlComponent: NumberControlComponent;

  myForm: FormGroup;
  formSubscription: Subscription;
  anotherNumber: FormControl;
  startYear: FormControl;
  lastName: FormControl;
  notifyViaMail: FormControl;

  formMetadata: any;
  controlMetadata: { [name: string]: GeneralControlMetadata | TextInputControlBaseMetadata | DecimalControlMetadata | IntegerControlMetadata | StringControlMetadata | CheckboxControlMetadata } = {
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
      anotherNumber: [123],
      startYear: [2000],
      lastName: ["Smith"],
      notifyViaMail: [false]
    });


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
