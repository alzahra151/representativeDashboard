import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-rejected-request',
  templateUrl: './rejected-request.component.html',
  styleUrls: ['./rejected-request.component.scss']
})
export class RejectedRequestComponent implements OnInit {
  requests: any
  constructor(private reqService: RequestService) {

  }
  ngOnInit(): void {
    this.getRejectedReqs()
  }
  getRejectedReqs() {
    this.reqService.getRejectedReqs().subscribe({
      next: (reqs) => {
        this.requests = reqs
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
