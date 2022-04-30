import { createReducer, on, Action } from "@ngrx/store";
import { IUser } from "src/app/models/user.model";
import { onboardCustomerSuccessAction, isUserInvitedSuccessAction } from "./onboarding.actions";

export interface OnboardingState {
  responseStatus: any;
  invitedUser: IUser;
}

export const initialState: OnboardingState = {
  responseStatus: null,
  invitedUser: null
};

const onboardingReducer = createReducer(
  initialState,
  on(isUserInvitedSuccessAction, (state, action) => {
    return Object.assign({}, state, { invitedUser: action.response });
  }),
  on(onboardCustomerSuccessAction, (state, action) => {
    return Object.assign({}, state, { responseStatus: action.response });
  }),
);
export function OnboardingReducer(state: OnboardingState, action: Action) {
  return onboardingReducer(state, action);
}