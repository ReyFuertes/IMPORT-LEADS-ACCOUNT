import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { createCustomerAction, createOnboardingFailedAction, createCustomerSuccessAction, isUserInvitedAction, isUserInvitedSuccessAction } from './onboarding.actions';
import { OnboardingService } from '../onboarding.service';
import { IUser } from 'src/app/models/user.model';
import { StorageService } from '../../service/storage.service';

@Injectable()
export class OnboardingEffects {
  isUserInvitedAction$ = createEffect(() => this.actions$.pipe(
    ofType(isUserInvitedAction),
    switchMap(({ id }) => this.onboardingService.getById(id, 'invited').pipe(
      map((response: IUser) => {
        this.storageService.set('inv', true)
        return isUserInvitedSuccessAction({ response });
      })
    ))
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
      
  constructor(private actions$: Actions, private onboardingService: OnboardingService, private storageService: StorageService) { }
}
