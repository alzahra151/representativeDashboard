import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentedReqComponent } from './commented-req.component';

describe('CommentedReqComponent', () => {
  let component: CommentedReqComponent;
  let fixture: ComponentFixture<CommentedReqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentedReqComponent]
    });
    fixture = TestBed.createComponent(CommentedReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
