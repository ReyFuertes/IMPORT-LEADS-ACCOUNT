
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
  phoneNumber: string;
  address: string;
  companyName: string;
  companyAddress: string;
  language: string;
}
export interface IEmailPassword {
  username: string;
  password: string
}
