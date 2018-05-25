import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorFormRowComponent } from './editor-form-row.component';

describe('EditorFormRowComponent', () => {
  let component: EditorFormRowComponent;
  let fixture: ComponentFixture<EditorFormRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorFormRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorFormRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
