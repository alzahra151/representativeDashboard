
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PdfService } from 'src/app/services/pdf.service';
import { RequestService } from 'src/app/services/request.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-req-details-manager',
  templateUrl: './req-details-manager.component.html',
  styleUrls: ['./req-details-manager.component.scss'],

})
export class ReqDetailsManagerComponent {
  pdfUrl: any
  ReqID: any
  Request: any
  reqForm: FormGroup
  userRole: any;
  constructor(private route: ActivatedRoute, private router: Router,
    private reqService: RequestService, private FormBuilder: FormBuilder, private authService: AuthService,
    private spinner: NgxSpinnerService, private PdfService: PdfService) {

    // this.route.paramMap
    //   .subscribe(params => {
    //     console.log(params); // { orderby: "price" }
    //     this.ReqID = params.get('id');
    //     console.log(this.ReqID); // price
    //   }
    //   );
    this.reqForm = FormBuilder.group({
      InitialAmountOfMoney: ['', [Validators.required]],
      Maintenance: FormBuilder.array([]),
    })
  }
  get mentaiance() {
    return this.reqForm.get('Maintenance') as FormArray;
  }
  mentainanceDetails(): FormGroup {
    return this.FormBuilder.group({
      maintainanceData: this.FormBuilder.group({
        description: [''],
        price: [],
      }),
      serviceId: []
    })
  }
  addServicesMentainanceInputes() {

    for (let i = 0; i < this.Request.PriceOffer.Services.length; i++) {
      console.log(this.Request.PriceOffer.Services.length)
      this.mentaiance.push(this.mentainanceDetails())
      this.mentaiance.controls[i].get('serviceId')?.patchValue(this.Request.PriceOffer.Services[i]._id)
    }

  }
  ngOnInit(): void {
    this.userRole = this.authService.getUserRole()
    console.log(this.userRole)
    // this.getReqDetails()

  }
  // getReqDetails() {
  //   this.reqService.GetReqDetails(this.ReqID).subscribe({
  //     next: (data) => {
  //       this.Request = data
  //       console.log(this.Request)
  //       this.addServicesMentainanceInputes()
  //     },
  //     error: (err) => {
  //       console.log(err)
  //     }
  //   })
  // }
  // downloadPDf(offerData: any) {
  //   this.spinner.show()
  //   // console.log(this.Request)
  //   // console.log(offerData)
  //   this.PdfService.downloadPDF(offerData).subscribe({
  //     next: (x: any) => {
  //       var newBlob = new Blob([x], { type: "application/pdf" });

  //       const data = window.URL.createObjectURL(newBlob);
  //       var link = document.createElement("a");
  //       link.href = data;
  //       this.pdfUrl = data
  //       link.download = `02-${this.Request.QrCode}.pdf`;
  //       // this is necessary as link.click() does not work on the latest firefox
  //       link.dispatchEvent(
  //         new MouseEvent("click", {
  //           bubbles: true,
  //           cancelable: true,
  //           view: window
  //         })
  //       );
  //       this.spinner.hide()
  //       setTimeout(function () {
  //         // For Firefox it is necessary to delay revoking the ObjectURL
  //         window.URL.revokeObjectURL(data);
  //         link.remove();
  //       }, 100);
  //     },
  //     error: (err) => {
  //       console.log("ERR", err);
  //       this.spinner.hide()
  //     },
  //   })

  // }
  ngOnDestroy() {
    this.spinner.hide()

  }
  sendRequest() {
    const { InitialAmountOfMoney } = this.reqForm.value

    const { Maintenance } = this.reqForm.value
    console.log(this.reqForm.get('InitialAmountOfMoney')?.value)
    forkJoin([
      this.reqService.updateReq(this.Request._id, { InitialAmountOfMoney, SendToAdmin: true }),
      this.reqService.updatePriceOfferService(this.Request.PriceOffer._id, Maintenance)
    ]).subscribe(
      ([resultFromFirst, resultFromSecond]) => {
        console.log('update request result:', resultFromFirst);
        console.log('update offer result:', resultFromSecond);
        this.router.navigate(['/ManagerHome/AllRequestes'])
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  addMaintanance(id: any) {
    console.log(id)
  }
}

