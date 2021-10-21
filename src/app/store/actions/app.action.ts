import { createAction, props } from '@ngrx/store';
import { IAccess } from 'src/app/models/user.model';

export enum AppActionTypes {
  loadUserAccessAction = '[User] load user access',
  loadUserAccessSuccessAction = '[User] load user access (success)',
}
export const loadUserAccessAction = createAction(
  AppActionTypes.loadUserAccessAction
);
export const loadUserAccessSuccessAction = createAction(
  AppActionTypes.loadUserAccessSuccessAction,
  props<{ response: IAccess[] }>()
);
