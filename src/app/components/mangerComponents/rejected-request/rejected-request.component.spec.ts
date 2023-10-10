import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedRequestComponent } from './rejected-request.component';

describe('RejectedRequestComponent', () => {
  let component: RejectedRequestComponent;
  let fixture: ComponentFixture<RejectedRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectedRequestComponent]
    });
    fixture = TestBed.createComponent(RejectedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
