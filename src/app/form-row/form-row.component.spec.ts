import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRowComponent } from './form-row.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';

describe('FormRowComponent', () => {
  let component: FormRowComponent;
  let fixture: ComponentFixture<FormRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRowComponent, ValidationErrorsComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
