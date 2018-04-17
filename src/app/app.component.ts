import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.formSubscription = this.myForm.valueChanges.subscribe( (v)=> console.log(`Form value ${JSON.stringify(v)}`));
  }

  myForm: FormGroup;
  formSubscription: Subscription;
  secondNumber: FormControl;

  createForm() {
    this.myForm = this.fb.group({
      firstNumber: [""],
      secondNumber: [123, []]
    });

    this.secondNumber = <FormControl>this.myForm.controls["secondNumber"];
  }


  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
