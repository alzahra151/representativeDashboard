import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqDetailsManagerComponent } from './req-details-manager.component';

describe('ReqDetailsManagerComponent', () => {
  let component: ReqDetailsManagerComponent;
  let fixture: ComponentFixture<ReqDetailsManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReqDetailsManagerComponent]
    });
    fixture = TestBed.createComponent(ReqDetailsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
