import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedReqsComponent } from './accepted-reqs.component';

describe('AcceptedReqsComponent', () => {
  let component: AcceptedReqsComponent;
  let fixture: ComponentFixture<AcceptedReqsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptedReqsComponent]
    });
    fixture = TestBed.createComponent(AcceptedReqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
