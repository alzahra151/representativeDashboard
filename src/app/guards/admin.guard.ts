// import { CanActivateFn } from '@angular/router';

// export const adminGuard: CanActivateFn = (route, state) => {
//   return true;
// };
import { CanActivate, CanActivateChildFn, CanLoad, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router, ActivatedRouteSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Roles } from '../models/roles';
// import { AuthService } from './services/auth.service';
// import { Role } from './models/role';
@Injectable()
export class AdminGuard implements CanActivate {



  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  // canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  //   // console.log(this.authService.getUserRole(), "from guard")
  //   if (this.authService.getUserRole() === Roles.SalesManager) {
  //     // this.router.navigate(['/home/AllRequestes'])
  //     return true;
  //   }
  //   this.router.navigate(['/ManagerHome'])
  //   // router.
  //   return false;
  // }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // requiredRoles = route.data['roles'] as string[];
    // hasAccess = requiredRoles.some(role => userRoles.includes(role));
    console.log(this.authService.getUserRole(), "from guard")
    if (this.authService.getUserRole() === Roles.SalesManager) {
      // this.router.navigate(['/home/AllRequestes'])
      return true;
    }
    this.router.navigate(['/'])
    // router.
    return false;

  }

}

