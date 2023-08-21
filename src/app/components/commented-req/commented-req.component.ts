import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { io } from 'socket.io-client'
@Component({
  selector: 'app-commented-req',
  templateUrl: './commented-req.component.html',
  styleUrls: ['./commented-req.component.scss']
})
export class CommentedReqComponent implements OnInit {
  requests: any
  socket = io('https://varroxadministrationapi.onrender.com');
  constructor(private reqService: RequestService) {

    this.socket.on('ReqChange', (change) => {
      console.log('Post change:', change);
      this.getCommentedReqs()
    });
  }
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

