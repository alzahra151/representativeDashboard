import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { OffersService } from 'src/app/services/offers.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request-archive',
  templateUrl: './request-archive.component.html',
  styleUrls: ['./request-archive.component.scss']
})
export class RequestArchiveComponent implements OnInit {

  requests: any
  EditedReq: any
  socket = io('https://varrox-system-apii.onrender.com');
  constructor(private OfferService: OffersService, private reqSerice: RequestService) {
    this.socket.on('ReqChange', (change) => {
      console.log('User change:', change);
      this.getRequests()
    });
  }
  ngOnInit(): void {
    this.getRequests()
  }
  getRequests() {
    this.reqSerice.representArchiveReq().subscribe({
      next: (data) => {
        this.requests = data
        console.log(this.requests)
        console.log("test")
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


}
