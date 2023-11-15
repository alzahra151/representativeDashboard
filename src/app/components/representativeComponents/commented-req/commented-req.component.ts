import { Component, OnDestroy, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { io } from 'socket.io-client'
@Component({
  selector: 'app-commented-req',
  templateUrl: './commented-req.component.html',
  styleUrls: ['./commented-req.component.scss']
})
export class CommentedReqComponent implements OnInit, OnDestroy {
  requests: any
  socket = io('https://varrox-system-apii.onrender.com');
  constructor(private reqService: RequestService) {

    this.socket.on('ReqChange', (change) => {
      console.log('Post change:', change);
      this.getCommentedReqs()
    });
  }


  // requests: any
  // constructor(private reqService: RequestService) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getCommentedReqs()
  }
  ngOnDestroy() {
    this.socket.off('ReqChange');
  }
  getCommentedReqs() {
    this.reqService.getCommentedRepresentReqs().subscribe({
      next: (data) => {
        this.requests = data
        console.log(this.requests)
      }, error: (err) => {
        console.log(err)
      }
    })
  }

}

