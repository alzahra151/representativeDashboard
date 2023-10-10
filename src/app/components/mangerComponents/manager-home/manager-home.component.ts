import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.scss']
})
export class ManagerHomeComponent {
  gfg: boolean = false
  counts: any
  constructor(private reqService: RequestService) { }
  ngOnInit() {
    // throw new Error('Method not implemented.');
    this.reqService.reqsCount().subscribe({
      next: (counts) => {
        this.counts = counts
        console.log(this.counts)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
