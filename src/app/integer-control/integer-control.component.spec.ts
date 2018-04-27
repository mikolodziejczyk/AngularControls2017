import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegerControlComponent } from './integer-control.component';

describe('IntegerControlComponent', () => {
  let component: IntegerControlComponent;
  let fixture: ComponentFixture<IntegerControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegerControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegerControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
