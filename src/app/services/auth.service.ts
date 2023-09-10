import { Injectable, OnInit } from '@angular/core';
import { Roles } from '../models/roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: Roles = Roles.Representative;

  constructor() { }

  getUserRole(): Roles {
    const token = localStorage.getItem('token') || ''
    const userData = JSON.parse(atob(token.split('.')[1]))
    // console.log(userData)
    this.userRole = userData.Role
    console.log("test ", this.userRole)
    return this.userRole
  }


}
