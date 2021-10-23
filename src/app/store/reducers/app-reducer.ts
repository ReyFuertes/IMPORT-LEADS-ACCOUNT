import { createReducer, on, Action } from "@ngrx/store";
import { IRole } from "src/app/models/generic.model";
import { IAccess } from "src/app/models/user.model";
import { loadAllRolesSuccessAction, loadUserAccessSuccessAction } from "../actions/app.action";
export interface appState {
  access?: IAccess[],
  roles?: IRole[],
}
export const initialState: appState = {
  access: null,
  roles: null
};
const appReducer = createReducer(
  initialState,
  on(loadAllRolesSuccessAction, (state, action) => {
    return Object.assign({}, state, { roles: action.response });
  }),
  on(loadUserAccessSuccessAction, (state, action) => {
    return Object.assign({}, state, { access: action.response });
  }),
);
export function AppReducer(state: appState, action: Action) {
  return appReducer(state, action);
}