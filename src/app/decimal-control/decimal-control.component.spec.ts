import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecimalControlComponent } from './decimal-control.component';

describe('DecimalControlComponent', () => {
  let component: DecimalControlComponent;
  let fixture: ComponentFixture<DecimalControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecimalControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecimalControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
