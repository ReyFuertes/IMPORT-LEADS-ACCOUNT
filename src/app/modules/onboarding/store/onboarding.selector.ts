import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';
import { RootState } from 'src/app/store/root.reducer';

export const selectedState = (state: RootState) => state.onboarding;
export const isUserInvitedSelector = createSelector(
  selectedState,
  state =>  state.invitedUser ? true : false
);
export const getIsUserInvitedSelector = createSelector(
  selectedState,
  state => state.invitedUser
);
export const getOnboardingReponseStatusSelector = createSelector(
  selectedState,
  state => state.responseStatus
);