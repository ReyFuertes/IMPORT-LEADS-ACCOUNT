import { createAction, props } from '@ngrx/store';
import { IOnboarding } from 'src/app/models/onboarding.model';

export enum OnboardingActionTypes {
  createCustomerAction = '[Onboarding] create',
  createCustomerSuccessAction = '[Onboarding] create (success)',
  createOnboardingFailedAction = '[Onboarding] create (failed)'
}
export const createCustomerAction = createAction(
  OnboardingActionTypes.createCustomerAction,
  props<{ payload: IOnboarding }>()
);
export const createCustomerSuccessAction = createAction(
  OnboardingActionTypes.createCustomerSuccessAction,
  props<{ response: any }>()
);
export const createOnboardingFailedAction = createAction(
  OnboardingActionTypes.createOnboardingFailedAction,
  props<{ status: any }>()
);