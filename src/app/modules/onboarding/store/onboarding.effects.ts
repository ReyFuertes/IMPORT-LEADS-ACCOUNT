import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { createOnboardingAction, createOnboardingFailedAction, createOnboardingSuccessAction } from './onboarding.actions';
import { OnboardingService } from '../onboarding.service';

@Injectable()
export class OnboardingEffects {
  createOnboardingAction$ = createEffect(() => this.actions$.pipe(
    ofType(createOnboardingAction),
    switchMap(({ payload }) => this.onboardingService.post(payload).pipe(
      map((response: any) => {
        return createOnboardingSuccessAction({ response });
      }),
      catchError(() => {
        return of(createOnboardingFailedAction({ status: true }));
      })
    ))
  ));
      
  constructor(private actions$: Actions, private onboardingService: OnboardingService) { }
}
