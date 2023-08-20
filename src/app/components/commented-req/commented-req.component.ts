import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-commented-req',
  templateUrl: './commented-req.component.html',
  styleUrls: ['./commented-req.component.scss']
})
export class CommentedReqComponent implements OnInit {
  requests: any
  constructor(private reqService: RequestService) { }
  ngOnInit(): void {
    this.getCommentedReqs()
  }

  getCommentedReqs() {
    this.reqService.getCommentedReqs().subscribe({
      next: (data) => {
        this.requests = data
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }
}

