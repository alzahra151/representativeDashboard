import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffersService } from 'src/app/services/offers.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PdfService } from './../../services/pdf.service';
@Component({
  selector: 'app-offer-pdf',
  templateUrl: './offer-pdf.component.html',
  styleUrls: ['./offer-pdf.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class OfferPDFComponent implements OnInit {
  offerID: any
  Offer: any
  visible: boolean = false
  visibleSuccess: boolean = false
  pdfUrl: any
  @ViewChild('qutation') qutation!: ElementRef
  constructor(private offerService: OffersService, private route: ActivatedRoute, private PdfService: PdfService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.offerID = param.get('id')
    })
    this.getOfferById()
  }
  getOfferById() {
    this.offerService.getOfferById(this.offerID).subscribe({
      next: (offer) => {
        this.Offer = offer
        console.log(this.Offer)
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }
  sendPdfWithMail(offerData: any) {
    console.log(offerData)
    this.PdfService.generatePDF(offerData).subscribe({
      next: (pdf) => {
        console.log(pdf)
        console.log("successfully")
        this.visibleSuccess = true
        this.visible = false
        this.messageService.add({ severity: 'success', summary: '  تم ارسال الملف بنجاح ', detail: '  ' });
      }
      , error: (err) => {
        console.log(err.message)
      }
    })
  }
  downloadPDf(offerData: any) {

    this.PdfService.downloadPDF(offerData).subscribe({
      next: (x: any) => {
        var newBlob = new Blob([x], { type: "application/pdf" });

        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        this.pdfUrl = data
        link.download = "نموذج عرض السعر.pdf";
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window
          })
        );
        setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      },
      error: (err) => {
        console.log("ERR", err);
      },
    })

  }
  showDialog() {
    this.visible = true
  }
  // confirmDelete(offerData: any) {
  //   this.confirmationService.confirm({
  //     message: 'هل انت متأكد أنك تريد حذف هذا العرض؟',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.sendPdfWithMail(this.Offer)
  //     },
  //     reject: () => {
  //       this.messageService.add({ severity: 'warn', summary: 'ارسال عرض السعر', detail: 'لم يتم الارسال' });

  //     }
  //   });
  // }

}

