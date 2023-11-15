

import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';


@Component({
  selector: 'app-all-reqs',
  templateUrl: './all-reqs.component.html',
  styleUrls: ['./all-reqs.component.scss']
})
export class AllReqsComponent implements OnInit {
  reqs: any
  constructor(private reqService: RequestService) { }
  ngOnInit(): void {
    this.reqService.representCompletedReq().subscribe({
      next: (data) => {
        this.reqs = data
        console.log(this.reqs)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
