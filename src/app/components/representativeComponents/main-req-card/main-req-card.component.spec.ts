import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainReqCardComponent } from './main-req-card.component';

describe('MainReqCardComponent', () => {
  let component: MainReqCardComponent;
  let fixture: ComponentFixture<MainReqCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainReqCardComponent]
    });
    fixture = TestBed.createComponent(MainReqCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
