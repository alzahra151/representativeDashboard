
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
@Component({
  selector: 'app-req-details-manager',
  templateUrl: './req-details-manager.component.html',
  styleUrls: ['./req-details-manager.component.scss']
})
export class ReqDetailsManagerComponent {

  ReqID: any
  Request: any
  InitialMonyForm: FormGroup
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
    this.InitialMonyForm = FormBuilder.group({
      InitialAmountOfMoney: ['', [Validators.required]],
    })
  }
  ngOnInit(): void {
    this.userRole = this.authService.getUserRole()
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
  SendReqWithAmountOfMony() {
    const InitialAmountOfMoney = { ...this.InitialMonyForm.value, SendToAdmin: true }
    this.reqService.updateReq(this.Request._id, InitialAmountOfMoney).subscribe({
      next: (data) => {
        console.log(data)
        this.router.navigate(['/ManagerHome/AllRequestes'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}

