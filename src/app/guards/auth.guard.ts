import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const requiredRoles = route.data['roles'] as string[]; // Retrieve the required roles from the route's data
  const userRoles = localStorage.getItem('Role') || ''
  // const router: Router = Injectable(Router);
  const hasAccess = requiredRoles.some(role => userRoles.includes(role));
  if (hasAccess) {
    return true;
  }
  else {

    return false;
  }

};


