
export interface IOnboarding {
  email_password: IEmailPassword;
  general_information: IGeneralInformation;
  user_information: IUserInformation[];
}
export interface IUserInformation {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  access: string[];
  roles: string[];
}
export interface IGeneralInformation {
  firstname: string;
  lastname: string;
  phone_number: string;
  address: string;
  company_name: string;
  company_address: string;
  language: string;
}
export interface IEmailPassword {
  username: string;
  password: string;
}
