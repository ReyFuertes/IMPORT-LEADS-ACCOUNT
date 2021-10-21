
import { ActionReducerMap } from '@ngrx/store';
import { AppReducer, appState } from './reducers/app-reducer';
export interface RootState {
  appState: appState
}
export const reducers: ActionReducerMap<RootState> = {
  appState: AppReducer
};
