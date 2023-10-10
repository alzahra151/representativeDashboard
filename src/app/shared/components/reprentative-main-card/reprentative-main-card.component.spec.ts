import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprentativeMainCardComponent } from './reprentative-main-card.component';

describe('ReprentativeMainCardComponent', () => {
  let component: ReprentativeMainCardComponent;
  let fixture: ComponentFixture<ReprentativeMainCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReprentativeMainCardComponent]
    });
    fixture = TestBed.createComponent(ReprentativeMainCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
