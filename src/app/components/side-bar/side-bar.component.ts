import { AuthService } from './../../services/auth.service';
import { authGuard } from './../../guards/auth.guard';
import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  gfg: boolean = false
  userRole: any
  constructor(private AuthService: AuthService) {
    this.getRole()
  }
  getRole() {
    this.userRole = this.AuthService.getUserRole()
    console.log(this.userRole)
  }
}
