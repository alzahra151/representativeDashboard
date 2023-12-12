import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-represent-layout',
  templateUrl: './represent-layout.component.html',
  styleUrls: ['./represent-layout.component.scss']
})
export class RepresentLayoutComponent implements OnInit {
  constructor(private useService: UserService) { }
  ngOnInit(): void {
    this.useService.imageSubject.subscribe({
      next: (data) => {
        this.AgentImage
      }
    })
  }
  gfg: boolean = false
  get AgentName() {
    return localStorage.getItem('FullName')
  }
  get AgentImage() {
    return localStorage.getItem('Image')
  }

}
