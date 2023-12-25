import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-approved-request-archive',
  templateUrl: './approved-request-archive.component.html',
  styleUrls: ['./approved-request-archive.component.scss']
})
export class ApprovedRequestArchiveComponent {
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
    this.getAprovedReq(6, 0)
  }
  getAprovedReq(limit: number, page: number) {
    this.reqService.getApprovedArchieve(limit, page).subscribe({
      next: (reqs) => {
        this.requests = reqs
        console.log(this.requests)
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }
  onPageChange(event: any) {
    console.log(event)
    console.log(event.page)
    this.getAprovedReq(event.rows, event.page)
  }
}

