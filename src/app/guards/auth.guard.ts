// import { Inject, Injectable, Injector } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';
// import { Roles } from '../models/roles';

// export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
//   : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
//   const authService = Inject(AuthService)

//   const roles: Roles = Inject(Roles)
//   const requiredRoles = route.data['roles'] as string[]; // Retrieve the required roles from the route's data
//   const userRoles = localStorage.getItem('Role') || ''
//   // const router: Router = Inject(Router);
//   const hasAccess = requiredRoles.some(role => userRoles.includes(role));
//   if (userRoles == Roles.SalesManager) {

//     router.navigate(['/AllRequestes'])
//     return true;
//   }
//   else {
//     router.navigate(['/home'])
//     // router.
//     return false;
//   }

// };

import { CanActivate, CanActivateChild, CanActivateChildFn, CanLoad, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router, ActivatedRouteSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Roles } from '../models/roles';
// import { AuthService } from './services/auth.service';
// import { Role } from './models/role';
@Injectable()
export class AuthGuard implements CanActivateChild {



  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // console.log(this.authService.getUserRole(), "from guard")
    if (this.authService.getUserRole() === Roles.SalesManager) {
      // this.router.navigate(['/home/AllRequestes'])
      return true;
    }
    this.router.navigate(['/ManagerHome'])
    // router.
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // requiredRoles = route.data['roles'] as string[];
    // hasAccess = requiredRoles.some(role => userRoles.includes(role));
    console.log(this.authService.getUserRole(), "from guard")
    if (this.authService.getUserRole() === Roles.Representative) {
      // this.router.navigate(['/home/AllRequestes'])
      return true;
    }
    this.router.navigate(['/'])
    // router.
    return false;

  }

}
