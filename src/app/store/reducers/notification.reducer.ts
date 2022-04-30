import { on } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { createReducer } from '@ngrx/store';
import { INotification, removeFailedNotificationAction, notificationSuccessAction, notificationFailedAction, removeSuccessNotificationAction } from '../actions/notification.action';

export interface NotificationState {
  notificationSuccess: INotification,
  notificationFailed: INotification
}
export const initialState = {
  notificationSuccess: null,
  notificationFailed: null
};
const notificationReducer = createReducer(
  initialState,
  on(removeSuccessNotificationAction, (state) => {
    return Object.assign({ ...state, notificationSuccess: null });
  }),
  on(removeFailedNotificationAction, (state) => {
    return Object.assign({ ...state, notificationFailed: null });
  }),
  on(notificationSuccessAction, (state, action) => {
    return ({ ...state, notificationSuccess: action.notification })
  }),
  on(notificationFailedAction, (state, action) => {
    return ({ ...state, notificationFailed: action.notification })
  }),
);
export function NotificationReducer(state: NotificationState, action: Action) {
  return notificationReducer(state, action);
}