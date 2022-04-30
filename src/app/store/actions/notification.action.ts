import { createAction, props } from '@ngrx/store';

export interface INotification {
  success?: boolean;
  message: string;
  error?: boolean;
  info?: boolean;
  warning?: boolean;
}

export enum NotificationActionTypes {
  notificationSuccessAction = '[Notification] Success',
  notificationFailedAction = '[Notification] Failed',
  removeSuccessNotificationAction = '[Notification] Remove Success',
  removeFailedNotificationAction = '[Notification] Remove Failed',
}
export const notificationFailedAction = createAction(
  NotificationActionTypes.notificationFailedAction,
  props<{ notification: INotification }>()
);
export const notificationSuccessAction = createAction(
  NotificationActionTypes.notificationSuccessAction,
  props<{ notification: INotification }>()
);
export const removeSuccessNotificationAction = createAction(
  NotificationActionTypes.removeSuccessNotificationAction,
);
export const removeFailedNotificationAction = createAction(
  NotificationActionTypes.removeFailedNotificationAction,
);
