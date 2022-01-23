import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { tap, map, debounceTime } from 'rxjs/operators';
import { RootState } from '../store/root.reducer';
import { isUserInvitedSelector } from '../modules/onboarding/store/onboarding.selector';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<RootState>, private router: Router) { }

  /* check if user is currently loggedin */
  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(select(isUserInvitedSelector))
      .pipe(
        debounceTime(5000),
        tap(isLoggedIn => {
          if (!isLoggedIn) {
            //this.router.navigateByUrl('404');
          }
        })
      )
  }
}
