import { createReducer, on, Action } from "@ngrx/store";
import { createCustomerSuccessAction } from "./onboarding.actions";

export interface OnboardingState {
  responseStatus?: any
}

export const initialState: OnboardingState = {
  responseStatus: null
};

const onboardingReducer = createReducer(
  initialState,
  on(createCustomerSuccessAction, (state, action) => {
    return Object.assign({}, state, { responseStatus: action.response });
  }),
);
export function OnboardingReducer(state: OnboardingState, action: Action) {
  return onboardingReducer(state, action);
}