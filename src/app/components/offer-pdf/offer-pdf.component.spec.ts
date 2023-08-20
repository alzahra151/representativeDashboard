import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPDFComponent } from './offer-pdf.component';

describe('OfferPDFComponent', () => {
  let component: OfferPDFComponent;
  let fixture: ComponentFixture<OfferPDFComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferPDFComponent]
    });
    fixture = TestBed.createComponent(OfferPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
