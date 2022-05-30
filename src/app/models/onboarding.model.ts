
export interface IOnboarding {
  email_password: IEmailPassword;
  profile: IProfile;
  users: IUserInformation[];
}
export interface IUserInformation {
  firstname: string;
  lastname: string;
  username: string;
  password?: string;
  access: string[];
  roles: string[];
}
export interface IProfile {
  firstname: string;
  lastname: string;
  phone: string;
  address: string;
  company_name: string;
  company_address: string;
  language: string;
}
export interface IEmailPassword {
  username: string;
  password?: string;
}
