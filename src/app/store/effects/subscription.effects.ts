import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ISubscription } from 'src/app/models/generic.model';
import { SubscriptionService } from 'src/app/services/api.service';
import { addSubscriptionAction, addSubscriptionSuccessAction, deleteSubscriptionAction, deleteSubscriptionSuccessAction, getSubscriptionByIdAction, getSubscriptionByIdSuccessAction, getSubscriptionsAction, getSubscriptionsSuccessAction, updateSubscriptionAction, updateSubscriptionSuccessAction } from '../actions/subscription.action';

@Injectable()
export class SubscriptionsEffect {
  deleteSubscriptionAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteSubscriptionAction),
    switchMap(({ id }) => {
      return this.subscriptionService.delete(id).pipe(
        map((response: ISubscription) => {
          return deleteSubscriptionSuccessAction({ response });
        })
      )
    })
  ));
  updateSubscriptionAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateSubscriptionAction),
    switchMap(({ payload }) => {
      return this.subscriptionService.patch(payload).pipe(
        map((response: ISubscription) => {
          return updateSubscriptionSuccessAction({ response });
        })
      )
    })
  ));
  getSubscriptionByIdAction$ = createEffect(() => this.actions$.pipe(
    ofType(getSubscriptionByIdAction),
    switchMap(({ id }) => {
      return this.subscriptionService.getById(id).pipe(
        map((response: ISubscription) => {
          return getSubscriptionByIdSuccessAction({ response });
        })
      )
    })
  ));
  getSubscriptionsAction$ = createEffect(() => this.actions$.pipe(
    ofType(getSubscriptionsAction),
    switchMap(({ }) => {
      return this.subscriptionService.getAll().pipe(
        map((response: ISubscription[]) => {
          return getSubscriptionsSuccessAction({ response });
        })
      )
    })
  ));
  addSubscriptionAction$ = createEffect(() => this.actions$.pipe(
    ofType(addSubscriptionAction),
    switchMap(({ payload }) => {
      return this.subscriptionService.post(payload).pipe(
        map((response: ISubscription) => {
          return addSubscriptionSuccessAction({ response });
        })
      )
    })
  ));

  constructor(
    private actions$: Actions,
    private subscriptionService: SubscriptionService
  ) { }
}
