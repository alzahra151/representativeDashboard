
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PdfService } from 'src/app/services/pdf.service';
import { RequestService } from 'src/app/services/request.service';
@Component({
  selector: 'app-req-details-manager',
  templateUrl: './req-details-manager.component.html',
  styleUrls: ['./req-details-manager.component.scss']
})
export class ReqDetailsManagerComponent {
  pdfUrl: any
  ReqID: any
  Request: any
  InitialMonyForm: FormGroup
  userRole: any;
  constructor(private route: ActivatedRoute, private router: Router,
    private reqService: RequestService, private FormBuilder: FormBuilder, private authService: AuthService, private PdfService: PdfService) {

    this.route.paramMap
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.ReqID = params.get('id');
        console.log(this.ReqID); // price
      }
      );
    this.InitialMonyForm = FormBuilder.group({
      InitialAmountOfMoney: ['', [Validators.required]],
    })
  }
  ngOnInit(): void {
    this.userRole = this.authService.getUserRole()
    console.log(this.userRole)
    this.getReqDetails()
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
  SendReqWithAmountOfMony() {
    const InitialAmountOfMoney = { ...this.InitialMonyForm.value, SendToAdmin: true }
    this.reqService.updateReq(this.Request._id, InitialAmountOfMoney).subscribe({
      next: (data) => {
        console.log(data)
        this.router.navigate(['/ManagerHome/AllRequestes'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  downloadPDf(offerData: any) {
    console.log(this.Request)
    console.log(offerData)
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
}

