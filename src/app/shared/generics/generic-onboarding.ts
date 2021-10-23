import { Directive, Self, SkipSelf } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { IUser } from 'src/app/models/user.model';
import { StorageService } from 'src/app/modules/service/storage.service';
import { environment } from 'src/environments/environment';
import { GenericDestroyPageComponent } from './generic-destroy-page';

@Directive()
export class GenericOnboardingComponent extends GenericDestroyPageComponent {
  public imgPath: string = environment.imgPath;
  public form: FormGroup;
  public formUsersArray: FormArray;
  public dataSource: any;
  
  constructor(private storageService: StorageService, private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      emailPassword: this.fb.group({
        username: ['', Validators.compose([Validators.required])],
        password: ['', Validators.required]
      }),
      generalInformation: this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        address: ['', Validators.required],
        companyName: ['', Validators.required],
        companyAddress: ['', Validators.required],
        language: ['en', Validators.required]
      }),
      users: new FormArray([]),
    });

    this.formUsersArray = this.form.get('users') as FormArray;

    if (this.getStorageValues) {
      this.form.patchValue(this.getStorageValues);
    }

    this.form.valueChanges.pipe(takeUntil(this.$unsubscribe)).subscribe(values => {
      if (values) {
        this.storageService.set('onboarding', values);
        console.log(values)
      }
    });
  }

  public removeUser(item: any): void {
    this.formUsersArray.removeAt(item);
    this.dataSource = this.formUsersArray.value;
  }

  public addUser(item: IUser): any {
    return this.formUsersArray.push(new FormControl(item));
  }

  public get getFormUsers(): FormArray {
    return this.form.get('users') as FormArray;
  }

  public get getStorageValues(): any {
    return this.storageService.get('onboarding');
  }

  public get getGeneralInformationFormValues(): any {
    return this.getGeneralInformationForm.value;
  }

  public get getUserFormValues(): any {
    return this.getUsersForm.value;
  }

  public get getUsersForm(): FormGroup {
    return this.form.get('users') as FormGroup;
  }

  public get getEmailPasswordForm(): FormGroup {
    return this.form.get('emailPassword') as FormGroup;
  }

  public get getGeneralInformationForm(): FormGroup {
    return this.form.get('generalInformation') as FormGroup;
  }
}
