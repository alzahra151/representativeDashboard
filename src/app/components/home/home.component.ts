import { AuthService } from './../../services/auth.service';
import { PdfService } from './../../services/pdf.service';
import { HttpHeaders } from '@angular/common/http';
import { OffersService } from './../../services/offers.service';
import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  offers: any
  httpOptions: any
  Requestes: any
  userRole: string = ''
  socket = io('https://varroxadministrationapi.onrender.com');
  constructor(private OffersService: OffersService, private PdfService: PdfService, private AuthService: AuthService) {
    this.getUserRole()
    // Listen for changes on the post change stream
    this.socket.on('OfferChange', (change) => {
      console.log('Post change:', change);
      this.getAgentOffers()
    });
  }
  ngOnInit(): void {
    this.getAgentOffers()
    this.getAllReqs()
  }
  getAgentOffers() {
    this.OffersService.getAgentOffers().subscribe({
      next: (data) => {
        this.offers = data
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
        console.log(data)
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

  getAllReqs() {
    this.OffersService.getAllReq().subscribe({
      next: (data) => {
        this.Requestes = data
        console.log(this.Requestes)
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }
  getUserRole() {
    this.userRole = this.AuthService.getUserRole()
    console.log(this.userRole)
  }
}
