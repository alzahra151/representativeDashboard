import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqDetailsComponent } from './req-details.component';

describe('ReqDetailsComponent', () => {
  let component: ReqDetailsComponent;
  let fixture: ComponentFixture<ReqDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReqDetailsComponent]
    });
    fixture = TestBed.createComponent(ReqDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
