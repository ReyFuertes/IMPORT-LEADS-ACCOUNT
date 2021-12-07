import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { createCustomerAction, createOnboardingFailedAction, createCustomerSuccessAction, isUserInvitedAction, isUserInvitedSuccessAction } from './onboarding.actions';
import { OnboardingService } from '../onboarding.service';
import { IUser } from 'src/app/models/user.model';

@Injectable()
export class OnboardingEffects {
  isUserInvitedAction$ = createEffect(() => this.actions$.pipe(
    ofType(isUserInvitedAction),
    switchMap(({ id }) => this.onboardingService.getById(id, 'invited').pipe(
      map((response: IUser) => {
        return isUserInvitedSuccessAction({ response });
      })
    ))
  ));

  createCustomerAction$ = createEffect(() => this.actions$.pipe(
    ofType(createCustomerAction),
    switchMap(({ payload }) => this.onboardingService.post(payload).pipe(
      map((response: any) => {
        return createCustomerSuccessAction({ response });
      }),
      catchError(() => {
        return of(createOnboardingFailedAction({ status: true }));
      })
    ))
  ));
      
  constructor(private actions$: Actions, private onboardingService: OnboardingService) { }
}
