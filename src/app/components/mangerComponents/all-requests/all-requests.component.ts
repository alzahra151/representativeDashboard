import { Component } from '@angular/core';
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.scss']
})
export class AllRequestsComponent {
  Requestes: any
  constructor(private reqService: OffersService) {

  }
  ngOnInit(): void {
    this.getAllReq()
  }
  getAllReq() {
    this.reqService.getAllReq().subscribe({
      next: (data) => {
        this.Requestes = data
        console.log(this.Requestes)
      },
      error(err) {
        console.log(err.message)
      }
    })
  }
}
