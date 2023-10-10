import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestArchiveComponent } from './request-archive.component';

describe('RequestArchiveComponent', () => {
  let component: RequestArchiveComponent;
  let fixture: ComponentFixture<RequestArchiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestArchiveComponent]
    });
    fixture = TestBed.createComponent(RequestArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
