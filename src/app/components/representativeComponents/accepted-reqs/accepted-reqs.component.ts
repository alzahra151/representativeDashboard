import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-accepted-reqs',
  templateUrl: './accepted-reqs.component.html',
  styleUrls: ['./accepted-reqs.component.scss']
})
export class AcceptedReqsComponent implements OnInit {
  requests: any
  constructor(private reqService: RequestService) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.acceptedReq()
  }
  acceptedReq() {
    this.reqService.representAcceptedReqs().subscribe({
      next: (data) => {
        this.requests = data
        console.log(this.requests)
      }, error: (err) => {
        console.log(err)
      }
    })
  }
}
