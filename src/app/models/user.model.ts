import { IRole } from "./generic.model";

export interface IUser {
  id?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  roles: IRole[];
  access: IAccess[];
  username?: string;
  subscription?: string;
  customer_users?: IUser[];
  profile?: IProfile;
  is_user?: boolean;
  is_submitted?: number;
}
export interface IProfile {
  address?: string;
  api_url?: string;
  company_address?: string;
  company_name?: string;
  database_name?: string;
  firstname?: string;
  id?: string;
  language?: string;
  lastname?: string;
  phone_number?: string;
  website_url?: string;
}
export interface IAccess {
  id?: string;
  access_name?: string;
  parent?: IAccess;
  user_route?: string;
}
