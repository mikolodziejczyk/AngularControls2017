import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { HttpClient } from '@angular/common/http';
import { FormMetadata, ControlsMetadata } from '../formMetadata';
import { markFormGroupTouched } from '../formhelpers/formHelpers';


@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient) {

    this.loadMetadata();
  }

  ngOnInit() {
  }

  async loadMetadata() {
    try {
      let o = this.http.get<FormMetadata>("assets/my-form-metadata.json");
      this.formMetadata = await o.toPromise();
      this.controlMetadata = this.formMetadata.controls;
      console.log("Metadata loaded");

      this.createForm();
      this.formSubscription = this.myForm.valueChanges.subscribe((v) => console.log(`Form value ${JSON.stringify(v)}`));
    }
    catch (ex) {
      console.log("Error " + ex);
    }
  }


  myForm: FormGroup;
  anotherNumber: FormControl;
  startYear: FormControl;
  lastName: FormControl;
  notifyViaMail: FormControl;

  formMetadata: FormMetadata;
  controlMetadata: ControlsMetadata;

  formSubscription: Subscription;
  isSaving: boolean = false;
  isCancelling: boolean = false;
  isError: boolean = false;
  errorMessage: string;

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
    markFormGroupTouched(this.myForm);
    this.myForm.updateValueAndValidity();



    if (this.myForm.valid) {
      this.save();
    }
    else {
      console.log(`Form invalid, submit cancelled.`);
    }

  }

  onCancel = () => {
    this.isCancelling = true;
    window.setTimeout(() => {
      window.location.href = this.formMetadata.navigation.cancelUrl;
    }, 2000);
  }

  save = async () => {
    this.isSaving = true;
    window.setTimeout(() => {


      console.log(`Form value: ${JSON.stringify(this.myForm.value)}`);

      if (this.lastName.value == "Error") {
        this.isSaving = false;
        this.errorMessage = "Nie udało sie zapisać zmian. Spróbuj ponownie.";
        this.isError = true;
      }
      else {
        if (this.notifyViaMail.value) {
          this.isSaving = false;
          this.myForm.setErrors({
            insufficient: "Wartość jest niewystarczająca.",
            unique_xxx: "Podane wartości są bez sensu!."
          });
        }
        else {
          window.location.href = this.formMetadata.navigation.okUrl;
        }
      }


    }, 4000);
  }






}
