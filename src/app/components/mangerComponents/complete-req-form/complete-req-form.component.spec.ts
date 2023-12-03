import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteReqFormComponent } from './complete-req-form.component';

describe('CompleteReqFormComponent', () => {
  let component: CompleteReqFormComponent;
  let fixture: ComponentFixture<CompleteReqFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteReqFormComponent]
    });
    fixture = TestBed.createComponent(CompleteReqFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
