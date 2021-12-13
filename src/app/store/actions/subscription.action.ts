
import { createAction, props } from '@ngrx/store';
import { ISubscription } from 'src/app/models/generic.model';

export enum SubscriptionActionTypes {
  addSubscriptionAction = '[Subscription] add user',
  addSubscriptionSuccessAction = '[Subscription] add user (success)',
  getSubscriptionsAction = '[Subscription] get users',
  getSubscriptionsSuccessAction = '[Subscription] get users (success)',
  getSubscriptionByIdAction = '[Subscription] get user by id',
  getSubscriptionByIdSuccessAction = '[Subscription] get user by id (success)',
  updateSubscriptionAction = '[Subscription] update user',
  updateSubscriptionSuccessAction = '[Subscription] update user (success)',
  deleteSubscriptionAction = '[Subscription] delete user',
  deleteSubscriptionSuccessAction = '[Subscription] delete user (success)',
}
export const deleteSubscriptionAction = createAction(
  SubscriptionActionTypes.deleteSubscriptionAction,
  props<{ id: string }>()
);
export const deleteSubscriptionSuccessAction = createAction(
  SubscriptionActionTypes.deleteSubscriptionSuccessAction,
  props<{ response: ISubscription }>()
);
export const updateSubscriptionAction = createAction(
  SubscriptionActionTypes.updateSubscriptionAction,
  props<{ payload: ISubscription }>()
);
export const updateSubscriptionSuccessAction = createAction(
  SubscriptionActionTypes.updateSubscriptionSuccessAction,
  props<{ response: ISubscription }>()
);
export const getSubscriptionByIdAction = createAction(
  SubscriptionActionTypes.getSubscriptionByIdAction,
  props<{ id: string }>()
);
export const getSubscriptionByIdSuccessAction = createAction(
  SubscriptionActionTypes.getSubscriptionByIdSuccessAction,
  props<{ response: ISubscription }>()
);
export const getSubscriptionsAction = createAction(
  SubscriptionActionTypes.getSubscriptionsAction
);
export const getSubscriptionsSuccessAction = createAction(
  SubscriptionActionTypes.getSubscriptionsSuccessAction,
  props<{ response: ISubscription[] }>()
);
export const addSubscriptionAction = createAction(
  SubscriptionActionTypes.addSubscriptionAction,
  props<{ payload: ISubscription }>()
);
export const addSubscriptionSuccessAction = createAction(
  SubscriptionActionTypes.addSubscriptionSuccessAction,
  props<{ response: ISubscription }>()
);