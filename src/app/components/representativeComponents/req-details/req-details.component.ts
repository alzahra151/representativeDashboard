import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { PdfService } from 'src/app/services/pdf.service';
import { RequestService } from 'src/app/services/request.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-req-details',
  templateUrl: './req-details.component.html',
  styleUrls: ['./req-details.component.scss'],
  providers: [MessageService]
})
export class ReqDetailsComponent implements OnInit, OnDestroy {
  ReqID: any
  Request: any
  pdfUrl: any
  userRole: any;
  constructor(private route: ActivatedRoute, private router: Router,
    private reqService: RequestService, private FormBuilder: FormBuilder, private authService: AuthService,
    private spinner: NgxSpinnerService, private PdfService: PdfService,
    private messageService: MessageService,
    private location: Location) {

    this.route.paramMap
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.ReqID = params.get('id');
        console.log(this.ReqID); // price
      }
      );

  }
  ngOnInit(): void {
    console.log(this.userRole)
    this.getReqDetails()
    this.spinner.hide()
  }
  getReqDetails() {
    this.reqService.GetReqDetails(this.ReqID).subscribe({
      next: (data) => {
        this.Request = data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  downloadPDf(offerData: any) {
    if (offerData.Approve) {
      this.spinner.show()
      // console.log(this.Request)
      // console.log(offerData)
      this.PdfService.downloadPDF(offerData).subscribe({
        next: (x: any) => {
          console.log(x)
          var newBlob = new Blob([x], { type: "application/pdf" });

          const data = window.URL.createObjectURL(newBlob);
          var link = document.createElement("a");
          link.href = data;
          this.pdfUrl = data
          console.log(this.pdfUrl)
          link.download = `02-${this.Request.QrCode}.pdf`;
          // this is necessary as link.click() does not work on the latest firefox
          link.dispatchEvent(
            new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
              view: window
            })
          );
          this.updateReqDownloadStatus()
          this.spinner.hide()
          setTimeout(function () {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
            link.remove();
          }, 100);
        },
        error: (err) => {
          console.log("ERR", err);
          this.spinner.hide()
        },
      })
    } else {
      this.preventDownloadMessage()
    }
  }
  ngOnDestroy() {
    this.spinner.hide()

  }
  preventDownloadMessage() {
    this.messageService.add({
      severity: "warn",
      detail: "you can't download this file",
    });
  }
  updateReqDownloadStatus() {
    this.reqService.updateReq(this.Request._id, { SlaesDownloaded: true }).subscribe({
      next: (data) => {
        console.log(data)
        this.location.back()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
