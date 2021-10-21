import { createReducer, on, Action } from "@ngrx/store";
import { IAccess } from "src/app/models/user.model";
import { loadUserAccessSuccessAction } from "../actions/app.action";
export interface appState {
  access?: IAccess[]
}
export const initialState: appState = {
  access: null
};
const appReducer = createReducer(
  initialState,
  on(loadUserAccessSuccessAction, (state, action) => {
    return Object.assign({}, state, { access: action.response });
  }),
);
export function AppReducer(state: appState, action: Action) {
  return appReducer(state, action);
}