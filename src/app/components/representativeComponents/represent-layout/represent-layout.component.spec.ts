import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentLayoutComponent } from './represent-layout.component';

describe('RepresentLayoutComponent', () => {
  let component: RepresentLayoutComponent;
  let fixture: ComponentFixture<RepresentLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepresentLayoutComponent]
    });
    fixture = TestBed.createComponent(RepresentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
