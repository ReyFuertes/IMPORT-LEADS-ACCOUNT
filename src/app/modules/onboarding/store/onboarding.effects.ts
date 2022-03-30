import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, retry, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { createCustomerAction, createOnboardingFailedAction, createCustomerSuccessAction, isUserInvitedAction, isUserInvitedSuccessAction, userNotInvitedAction } from './onboarding.actions';
import { OnboardingService } from '../onboarding.service';
import { IUser } from 'src/app/models/user.model';
import { StorageService } from '../../service/storage.service';
import { Router } from '@angular/router';

@Injectable()
export class OnboardingEffects {
  isUserInvitedAction$ = createEffect(() => this.actions$.pipe(
    ofType(isUserInvitedAction),
    switchMap(({ id }) => this.onboardingService.getById(id, 'invited').pipe(
      map((response: IUser) => {
        if(response) {
          this.storageService.set('inv', true);
          if(response?.customer_users?.length > 0) {
            this.storageService.set('users', JSON.stringify(response?.customer_users));
          }
        } else {
          setTimeout(() => this.router.navigateByUrl('404'), 500);
        }
        return isUserInvitedSuccessAction({ response });
      }),
      retry(3),
      catchError(() => of(userNotInvitedAction()))
    ))
  ));

  userNotInvitedAction$ = createEffect(() => this.actions$.pipe(
    ofType(userNotInvitedAction),
    tap(() => this.router.navigateByUrl('404')),
    map(() =>  null)
  ));
  
  createCustomerAction$ = createEffect(() => this.actions$.pipe(
    ofType(createCustomerAction),
    switchMap(({ payload }) => this.onboardingService.post(payload, 'onboard').pipe(
      map((response: any) => {
        return createCustomerSuccessAction({ response });
      }),
      catchError(() => {
        return of(createOnboardingFailedAction({ status: true }));
      })
    ))
  ));

  constructor(private router: Router, private actions$: Actions, private onboardingService: OnboardingService, private storageService: StorageService) { }
}
