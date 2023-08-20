import { Component, OnInit } from '@angular/core';
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-all-requestes',
  templateUrl: './all-requestes.component.html',
  styleUrls: ['./all-requestes.component.scss']
})
export class AllRequestesComponent implements OnInit {
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
      },
      error(err) {
        console.log(err.message)
      }
    })
  }
}
