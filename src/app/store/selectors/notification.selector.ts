import { createSelector } from '@ngrx/store';
import { RootState } from '../root.reducer';

export const selectedState = (state: RootState) => state.notification;
export const getNotificationSuccessSelector = createSelector(
  selectedState,
  state => state.notificationSuccess
);
export const getNotificationFailedSelector = createSelector(
  selectedState,
 state => state.notificationFailed
);