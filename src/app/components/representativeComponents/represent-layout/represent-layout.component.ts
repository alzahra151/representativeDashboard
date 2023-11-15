import { Component } from '@angular/core';

@Component({
  selector: 'app-represent-layout',
  templateUrl: './represent-layout.component.html',
  styleUrls: ['./represent-layout.component.scss']
})
export class RepresentLayoutComponent {
  gfg: boolean = false
  get AgentName() {
    return localStorage.getItem('FullName')
  }
  get AgentImage() {
    return localStorage.getItem('Image')
  }
}
