import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map, tap, first } from 'rxjs/operators';
import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.currentUser$.pipe(
      switchMap(user => user === undefined ? this.authService.authenticate() : [user]),
      map((user) => {
        const isLoggedFromData = childRoute.data.isLogged;
        return typeof isLoggedFromData !== 'boolean' || isLoggedFromData === !!user;
      }),
      tap((canContinue) => {
        if (canContinue) { return; }
        const url = this.router.url;
        this.router.navigateByUrl(url);
      }),
      first()
    );
  }

}
