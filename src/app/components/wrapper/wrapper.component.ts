import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  currentComponent: any
  constructor(private router: ActivatedRoute) { }
  ngOnInit(): void {
    const routeData = this.router.snapshot.data;
    const allowedRoles = routeData['roles'];
    console.log(allowedRoles)
    const userRole = localStorage.getItem('Role')
    console.log(userRole)
    if (allowedRoles.includes(userRole)) {
      console.log(userRole)
      this.currentComponent = routeData['component'];
    } else {
      // Handle unauthorized access
      console.log('unathunticated')
    }
  }
}
