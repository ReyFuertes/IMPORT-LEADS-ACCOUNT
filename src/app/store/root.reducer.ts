
import { ActionReducerMap } from '@ngrx/store';
import { OnboardingReducer, OnboardingState } from '../modules/onboarding/store/onboarding.reducers';
import { AppReducer, appState } from './reducers/app-reducer';
export interface RootState {
  appState: appState,
  onboarding: OnboardingState
}
export const reducers: ActionReducerMap<RootState> = {
  appState: AppReducer,
  onboarding: OnboardingReducer
};
