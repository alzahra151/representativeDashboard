import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRequestesComponent } from './all-requestes.component';

describe('AllRequestesComponent', () => {
  let component: AllRequestesComponent;
  let fixture: ComponentFixture<AllRequestesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllRequestesComponent]
    });
    fixture = TestBed.createComponent(AllRequestesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
