import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { HttpClient } from '@angular/common/http';
import { FormMetadata, ControlsMetadata } from '../formMetadata';
import { markFormGroupTouched } from '../formhelpers/formHelpers';
import { FormSaveReply } from '../formSaveReply';
import { errorsToErrorObject } from '../formhelpers/errorsToErrorObject';
import { MyFormData } from './my-form-data';
import { FormMetadataService } from '../form-metadata.service';
import { MyFormSaveService } from './my-form-save.service';


@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private metadataService: FormMetadataService, private saveService: MyFormSaveService) {

    this.loadMetadata();
  }

  ngOnInit() {
  }

  async loadMetadata() {
    this.formMetadata = await this.metadataService.getMetadata("assets/my-form-metadata.json");
    this.controlMetadata = this.formMetadata.controls;
    this.createForm();
  }


  myForm: FormGroup;
  anotherNumber: FormControl;
  startYear: FormControl;
  lastName: FormControl;
  notifyViaMail: FormControl;

  formMetadata: FormMetadata;
  controlMetadata: ControlsMetadata;

  isSaving: boolean = false;
  isCancelling: boolean = false;
  isFailure: boolean = false;
  failureMessage: string;

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

  }

  onSubmit = async () => {
    console.log(`onSubmit() called.`);
    markFormGroupTouched(this.myForm);
    this.myForm.updateValueAndValidity();



    if (!this.myForm.valid) {
      console.log(`Form invalid, submit cancelled.`);
      return;
    }

    this.isSaving = true;

    // convert form value into the format suitable for submitting, here no changes are neccessary.
    let formData: MyFormData = this.myForm.value;

    let r: FormSaveReply = await this.saveService.save(this.myForm.value);
    this.isSaving = false;


    if (r.isSuccess) {
      window.location.href = this.formMetadata.navigation.okUrl;
    } else if (r.isError) {

      let errors: ValidationErrors = errorsToErrorObject(r.errors);
      this.myForm.setErrors(errors);
    } else if (r.isFailure) {
      this.failureMessage = r.failureMessage || "Nie udało sie zapisać zmian. Spróbuj ponownie.";
    }



  }

  onCancel = () => {
    this.isCancelling = true;
    window.location.href = this.formMetadata.navigation.cancelUrl;
  }








}
