import { createAction, props } from '@ngrx/store';
import { IOnboarding } from 'src/app/models/onboarding.model';

export enum OnboardingActionTypes {
  createOnboardingAction = '[Onboarding] create',
  createOnboardingSuccessAction = '[Onboarding] create (success)',
  createOnboardingFailedAction = '[Onboarding] create (failed)'
}
export const createOnboardingAction = createAction(
  OnboardingActionTypes.createOnboardingAction,
  props<{ payload: IOnboarding }>()
);
export const createOnboardingSuccessAction = createAction(
  OnboardingActionTypes.createOnboardingSuccessAction,
  props<{ response: any }>()
);
export const createOnboardingFailedAction = createAction(
  OnboardingActionTypes.createOnboardingFailedAction,
  props<{ status: any }>()
);