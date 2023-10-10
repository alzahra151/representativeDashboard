import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-req-details',
  templateUrl: './req-details.component.html',
  styleUrls: ['./req-details.component.scss']
})
export class ReqDetailsComponent implements OnInit {
  ReqID: any
  Request: any

  userRole: any;
  constructor(private route: ActivatedRoute, private router: Router,
    private reqService: RequestService, private FormBuilder: FormBuilder, private authService: AuthService) {

    this.route.paramMap
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.ReqID = params.get('id');
        console.log(this.ReqID); // price
      }
      );

  }
  ngOnInit(): void {
    console.log(this.userRole)
    this.getReqDetails()
  }
  getReqDetails() {
    this.reqService.GetReqDetails(this.ReqID).subscribe({
      next: (data) => {
        this.Request = data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


}
