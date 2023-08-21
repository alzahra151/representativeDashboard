import { Injectable, OnInit } from '@angular/core';
import { Roles } from '../models/roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: Roles = Roles.Representative;
  constructor() { this.authenticate(); }
  private authenticate() {
    const token = localStorage.getItem('token') || ''
    console.log(token)
    const userData = JSON.parse(atob(token.split('.')[1]))
    console.log(userData)
    this.userRole = userData.Role
    console.log("test ", this.userRole)
  }
  getUserRole(): Roles {
    return this.userRole
  }

}
