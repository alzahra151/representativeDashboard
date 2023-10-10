import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedRequestComponent } from './accepted-request.component';

describe('AcceptedRequestComponent', () => {
  let component: AcceptedRequestComponent;
  let fixture: ComponentFixture<AcceptedRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptedRequestComponent]
    });
    fixture = TestBed.createComponent(AcceptedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
