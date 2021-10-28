import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';
import { RootState } from 'src/app/store/root.reducer';

export const selectedState = (state: RootState) => state.onboarding;
export const getOnboardingReponseStatus = createSelector(
  selectedState,
  state => state.responseStatus
);