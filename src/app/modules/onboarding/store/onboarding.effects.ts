import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { createCustomerAction, createOnboardingFailedAction, createCustomerSuccessAction } from './onboarding.actions';
import { OnboardingService } from '../onboarding.service';

@Injectable()
export class OnboardingEffects {
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
