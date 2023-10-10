import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-rejected-reqs',
  templateUrl: './rejected-reqs.component.html',
  styleUrls: ['./rejected-reqs.component.scss']
})
export class RejectedReqsComponent {
  requests: any
  constructor(private reqService: RequestService) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.acceptedReq()
  }
  acceptedReq() {
    this.reqService.representRejectedReqs().subscribe({
      next: (data) => {
        this.requests = data
        console.log(this.requests)
      }, error: (err) => {
        console.log(err)
      }
    })
  }
}
