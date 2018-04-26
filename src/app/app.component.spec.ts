import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MyComponentComponent } from './my-component/my-component.component';
import { NumberControlComponent } from './number-control/number-control.component';
import { ValidationErrorsComponent } from './validation-errors/validation-errors.component';
import { FormRowComponent } from './form-row/form-row.component';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { SampleModule } from 'third-lib';
import { ErrorMessageFormatter } from './errorMessages/errorMessageFormatter';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MyComponentComponent,
        NumberControlComponent,
        ValidationErrorsComponent,
        FormRowComponent
      ],
      imports: [ ReactiveFormsModule ],
      providers: [ ErrorMessageFormatter ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
