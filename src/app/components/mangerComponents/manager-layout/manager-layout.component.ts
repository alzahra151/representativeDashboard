import { Component } from '@angular/core';

@Component({
  selector: 'app-manager-layout',
  templateUrl: './manager-layout.component.html',
  styleUrls: ['./manager-layout.component.scss']
})
export class ManagerLayoutComponent {
  gfg: boolean = false
  get AgentName() {
    return localStorage.getItem('FullName')
  }
  get AgentImage() {
    return localStorage.getItem('Image')
  }
}
