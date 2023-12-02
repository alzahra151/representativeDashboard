import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OffersService } from 'src/app/services/offers.service';
import { RequestService } from 'src/app/services/request.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.scss']
})
export class AllRequestsComponent implements OnDestroy {
  Requestes: any;
  representatives: any
  selectedCountry: any
  date: any
  value: any
  filterData: any
  getAllReqSubscription: Subscription = new Subscription
  constructor(private reqService: OffersService, private reqsService: RequestService, private userService: UserService) {

  }
  ngOnDestroy() {
    this.getAllReqSubscription.unsubscribe()
  }
  ngOnInit(): void {
    this.getAllReq(5, 0)
    this.getRepresentative()
  }
  getAllReq(limit: number, page: number) {
    this.getAllReqSubscription = this.reqService.getAllReq(+limit, page).subscribe({

      next: (data) => {
        this.Requestes = data
        console.log(this.Requestes)
      },
      error(err) {
        console.log(err.message)
      }
    })
  }
  getRepresentative() {
    this.userService.getRepresentatives().subscribe({
      next: (data) => {
        this.representatives = data
        console.log(this.representatives)
      },
      error(err) {
        console.log(err.message)
      }
    })
  }
  filter(coulmn: any, q: any) {
    this.reqsService.reqFilter(coulmn, q).subscribe({
      next: (data) => {
        this.Requestes = data
        console.log(this.Requestes)
      },
      error(err) {
        console.log(err.message)
      }
    })
  }
  dateChanged(event: Date) {
    console.log(event)
    if (!event) {
      this.getAllReq(5, 0)
    } else {
      this.filter('createdAt', this.date)
    }
  }
  representativeChanged(event: any) {
    console.log(event)
    if (!event) {
      this.getAllReq(5, 0)
    } else {
      this.filter('Reprsentative', event?._id)
    }
  }
  // clientSearch(event: any) {
  //   console.log(event)
  // }
  onPageChange(event: any) {
    console.log(event)
    console.log(event.page)
    this.getAllReq(event.rows, event.page)
  }
}
