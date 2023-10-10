import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedReqsComponent } from './rejected-reqs.component';

describe('RejectedReqsComponent', () => {
  let component: RejectedReqsComponent;
  let fixture: ComponentFixture<RejectedReqsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectedReqsComponent]
    });
    fixture = TestBed.createComponent(RejectedReqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
