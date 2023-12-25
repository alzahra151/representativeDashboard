import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedRequestArchiveComponent } from './approved-request-archive.component';

describe('ApprovedRequestArchiveComponent', () => {
  let component: ApprovedRequestArchiveComponent;
  let fixture: ComponentFixture<ApprovedRequestArchiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedRequestArchiveComponent]
    });
    fixture = TestBed.createComponent(ApprovedRequestArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
