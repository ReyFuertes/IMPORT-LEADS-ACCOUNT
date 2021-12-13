export interface ISubscription {
  id?: string;
  name?: string;
  max_users?: number;
  rate?: string;
  description?: number;
  is_default?: boolean;
}
export interface IRole {
  id?: string;
  role_name?: string;
}
export interface IAccess {
  id?: string;
  access_name?: string;
  parent?: IAccess;
  user_route?: string;
}
export enum ModalStateType {
  add = 1,
  edit = 2
}
export interface QueryParam {
  query: string
}