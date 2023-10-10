import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresntHomeComponent } from './represnt-home.component';

describe('RepresntHomeComponent', () => {
  let component: RepresntHomeComponent;
  let fixture: ComponentFixture<RepresntHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepresntHomeComponent]
    });
    fixture = TestBed.createComponent(RepresntHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
