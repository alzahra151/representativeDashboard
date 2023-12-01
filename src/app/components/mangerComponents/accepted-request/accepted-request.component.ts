import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-accepted-request',
  templateUrl: './accepted-request.component.html',
  styleUrls: ['./accepted-request.component.scss']
})
export class AcceptedRequestComponent implements OnInit {
  requests: any
  representatives: any
  // selectedCountry: any
  // date: any
  // value: any
  // filterData: any
  // getAllReqSubscription: any
  constructor(private reqService: RequestService) {

  }
  ngOnInit() {
    this.getAprovedReq()
  }
  getAprovedReq() {
    this.reqService.getManagerAprovedReq().subscribe({
      next: (reqs) => {
        this.requests = reqs
        console.log(this.requests)
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }
}
