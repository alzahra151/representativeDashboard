import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { PdfService } from 'src/app/services/pdf.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-req-details',
  templateUrl: './req-details.component.html',
  styleUrls: ['./req-details.component.scss']
})
export class ReqDetailsComponent implements OnInit, OnDestroy {
  ReqID: any
  Request: any
  pdfUrl: any
  userRole: any;
  constructor(private route: ActivatedRoute, private router: Router,
    private reqService: RequestService, private FormBuilder: FormBuilder, private authService: AuthService,
    private spinner: NgxSpinnerService, private PdfService: PdfService) {

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
    this.spinner.show()
    // console.log(this.Request)
    // console.log(offerData)
    this.PdfService.downloadPDF(offerData).subscribe({
      next: (x: any) => {
        var newBlob = new Blob([x], { type: "application/pdf" });

        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        this.pdfUrl = data
        link.download = `${this.Request.QrCode}.pdf`;
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window
          })
        );
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

  }
  ngOnDestroy() {
    this.spinner.hide()

  }

}
