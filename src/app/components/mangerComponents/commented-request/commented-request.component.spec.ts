import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentedRequestComponent } from './commented-request.component';

describe('CommentedRequestComponent', () => {
  let component: CommentedRequestComponent;
  let fixture: ComponentFixture<CommentedRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentedRequestComponent]
    });
    fixture = TestBed.createComponent(CommentedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
