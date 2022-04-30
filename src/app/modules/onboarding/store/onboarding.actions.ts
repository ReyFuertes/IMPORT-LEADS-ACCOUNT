import { createAction, props } from '@ngrx/store';
import { IOnboarding } from 'src/app/models/onboarding.model';
import { IUser } from 'src/app/models/user.model';

export enum OnboardingActionTypes {
  onboardCustomerAction = '[Onboarding] onboard',
  onboardCustomerSuccessAction = '[Onboarding] onboard (success)',
  createOnboardingFailedAction = '[Onboarding] onboard (failed)',
  isUserInvitedAction = '[Public] user invited',
  isUserInvitedSuccessAction = '[Public] user invited (success)',
  userNotInvitedAction = '[Public] user not invited',
}
export const userNotInvitedAction = createAction(
  OnboardingActionTypes.userNotInvitedAction
);
export const isUserInvitedAction = createAction(
  OnboardingActionTypes.isUserInvitedAction,
  props<{ id: string }>()
);
export const isUserInvitedSuccessAction = createAction(
  OnboardingActionTypes.isUserInvitedSuccessAction,
  props<{ response: IUser }>()
);
export const onboardCustomerAction = createAction(
  OnboardingActionTypes.onboardCustomerAction,
  props<{ payload: IOnboarding }>()
);
export const onboardCustomerSuccessAction = createAction(
  OnboardingActionTypes.onboardCustomerSuccessAction,
  props<{ response: any }>()
);
export const createOnboardingFailedAction = createAction(
  OnboardingActionTypes.createOnboardingFailedAction,
  props<{ status: any }>()
);