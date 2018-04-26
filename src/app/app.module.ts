import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; 


import { AppComponent } from './app.component';

// Import your library
import { SampleModule } from 'third-lib';
import { MyComponentComponent } from './my-component/my-component.component';
import { AnotherComponentComponent } from './another-component/another-component.component';
import { NumberControlComponent } from './number-control/number-control.component';
import { ValidationErrorsComponent } from './validation-errors/validation-errors.component';
import { FormRowComponent } from './form-row/form-row.component';
import { ErrorMessageFormatter } from './errorMessages/errorMessageFormatter';

@NgModule({
  declarations: [
    AppComponent,
    MyComponentComponent,
    AnotherComponentComponent,
    NumberControlComponent,
    ValidationErrorsComponent,
    FormRowComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
     // Specify your library as an import
     SampleModule.forRoot()

  ],
  entryComponents: [AnotherComponentComponent],
  providers: [ ErrorMessageFormatter ],
  bootstrap: [AppComponent]
})
export class AppModule { }
