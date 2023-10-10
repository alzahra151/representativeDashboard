import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss']
})
export class RequestCardComponent {
  @Input() requests: any
  role: any
  constructor(private router: Router) { }

  goToEdite(id: String) {
    this.router.navigate(['/Requests/EditForm', id])

  }

}
