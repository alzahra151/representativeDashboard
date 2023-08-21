import { Component, OnInit } from '@angular/core';
import { OffersService } from 'src/app/services/offers.service';
import { io } from 'socket.io-client'
import { RequestService } from 'src/app/services/request.service';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  requests: any
  EditedReq: any
  socket = io('https://varroxadministrationapi.onrender.com');
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
    this.OfferService.getRepReqs().subscribe({
      next: (data) => {
        this.requests = data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
