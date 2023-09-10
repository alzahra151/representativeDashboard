import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentativeHomeComponent } from './representative-home.component';

describe('RepresentativeHomeComponent', () => {
  let component: RepresentativeHomeComponent;
  let fixture: ComponentFixture<RepresentativeHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepresentativeHomeComponent]
    });
    fixture = TestBed.createComponent(RepresentativeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
