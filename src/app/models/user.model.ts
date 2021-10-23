import { IRole } from "./generic.model";

export interface IUser {
  access: IAccess[];
  firstname?: string;
  lastname?: string;
  password?: string;
  roles: IRole[];
  username?: string;
}
export interface IAccess {
  id?: string;
  access_name?: string;
  parent?: IAccess;
  user_route?: string;
}
