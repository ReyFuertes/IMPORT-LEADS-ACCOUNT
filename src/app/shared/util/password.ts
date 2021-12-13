import { FormGroup } from "@angular/forms";

export function passwordValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.not_matched) {
      return;
    }
    if (control.errors && !control.errors.not_matched) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ not_matched: true });
      control.setErrors({ not_matched: true });
    } else {
      matchingControl.setErrors(null);
      control.setErrors(null);
    }
  }
}

export const generatePassword = () => {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var passwordLength = 12;
  var password = "";
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
}