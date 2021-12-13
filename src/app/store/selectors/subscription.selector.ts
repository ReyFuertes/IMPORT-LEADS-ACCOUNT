import { createSelector } from '@ngrx/store';
import { RootState } from 'src/app/store/root.reducer';

export const selectedState = (state: RootState) => state.subscription;
export const getSubscriptionByIdSelector = (id: string) => createSelector(
  selectedState,
  state => state?.entities[id]
);
export const editSubscriptionByIdSelector = createSelector(
  selectedState,
  state => state?.selectedSubscription
);
export const getSubscriptionsSelector = createSelector(
  selectedState,
  state => Object.values(state?.entities) 
);