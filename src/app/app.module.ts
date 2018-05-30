import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';

// Import your library
import { SampleModule } from 'third-lib';
import { MyComponentComponent } from './my-component/my-component.component';
import { AnotherComponentComponent } from './another-component/another-component.component';
import { NumberControlComponent } from './number-control/number-control.component';
import { ValidationErrorsComponent } from './validation-errors/validation-errors.component';
import { FormRowComponent } from './form-row/form-row.component';
import { ErrorMessageFormatter } from './errorMessages/errorMessageFormatter';
import { IntegerControlComponent } from './integer-control/integer-control.component';
import { DecimalControlComponent } from './decimal-control/decimal-control.component';
import { StringControlComponent } from './string-component/string-control.component';
import { EditorFormRowComponent } from './editor-form-row/editor-form-row.component';
import { CheckboxControlComponent } from './checkbox-control/checkbox-control.component';
import { FormActionsComponent } from './form-actions/form-actions.component';
import { FormErrorsComponent } from './form-errors/form-errors.component';
import { MyFormComponent } from './my-form/my-form.component';
import { OverlayComponent } from './overlay/overlay.component';
import { OperationFailedComponent } from './operation-failed/operation-failed.component';
import { FormMetadataService } from './form-metadata.service';
import { MyFormSaveService } from './my-form/my-form-save.service';

@NgModule({
  declarations: [
    AppComponent,
    MyComponentComponent,
    AnotherComponentComponent,
    NumberControlComponent,
    ValidationErrorsComponent,
    FormRowComponent,
    IntegerControlComponent,
    DecimalControlComponent,
    StringControlComponent,
    EditorFormRowComponent,
    CheckboxControlComponent,
    FormActionsComponent,
    FormErrorsComponent,
    MyFormComponent,
    OverlayComponent,
    OperationFailedComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    
     // Specify your library as an import
     SampleModule.forRoot()

  ],
  entryComponents: [AnotherComponentComponent],
  providers: [ ErrorMessageFormatter, MyFormSaveService, FormMetadataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
