import { Directive } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { StorageService } from 'src/app/modules/service/storage.service';
import { environment } from 'src/environments/environment';
import { GenericDestroyPageComponent } from './generic-destroy-page';
import { v4 as uuid } from 'uuid';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store/root.reducer';
import { isUserInvitedAction } from 'src/app/modules/onboarding/store/onboarding.actions';
@Directive()
export class GenericOnboardingComponent extends GenericDestroyPageComponent {
  public imgPath: string = environment.imgPath;
  public form: FormGroup;
  public formUsersArray: FormArray;
  public dataSource: any;
  public id: string;

  constructor(public store: Store<RootState>, public router: Router, private route: ActivatedRoute, public storageService: StorageService, private fb: FormBuilder) {
    super();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.store.dispatch(isUserInvitedAction({ id: this.id }));
    };

    this.form = this.fb.group({
      emailPassword: this.fb.group({
        id: [null, Validators.required],
        username: [null, Validators.compose([Validators.required])],
        password: [null, Validators.required]
      }),
      generalInformation: this.fb.group({
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        phoneNumber: [null, Validators.required],
        address: [null, Validators.required],
        companyName: [null, Validators.required],
        companyAddress: [null, Validators.required],
        language: ['en', Validators.required]
      }),
      users: new FormArray([]),
    });

    setTimeout(() => this.setFormValueFromStorage(), 100);
  }

  public onNext(url: string): void {
    this.setStorageFromFormValue();
    this.router.navigateByUrl(url);
  }

  public setStorageValue(name: string): void {
    let value = this.storageService.get(name);
    if (!value) return;

    this.storageService.set(name, this.form.value);
  }

  public setFormValueFromStorage(): void {
    this.form.patchValue(this.storageService.get('onboarding'));

    this.getStorageValues?.users?.forEach(value => {
      this.getUserFormValues.push(value)
    });
  }

  public setStorageFromFormValue(): void {
    this.storageService.set('onboarding', this.form.value);
  }

  public getStorageValue(values: string[], index: string): any {
    const value = this.storageService.get(index);
    if (!value) return [];

    let arr = JSON.parse(this.storageService.get(index)) || [];

    const results = arr?.filter(o => values.includes(o?.value));
    return results;
  }

  public splitToArray(str: string): any[] {
    return str.split(',');
  }

  public removeUser(item: any): void {
    this.formUsersArray.removeAt(item);
    this.dataSource = this.formUsersArray.value;
  }

  public addUser(item: IUser): any {
    return this.formUsersArray.push(new FormControl(item));
  }

  public get getStorageValues(): any {
    return this.storageService.get('onboarding');
  }

  public get getFormUsersArr(): FormArray {
    return this.form.get('users') as FormArray;
  }
  public get getUserFormValues(): any {
    return this.getFormUsersArr.value;
  }
  public get getUsersForm(): FormGroup {
    return this.form.get('users') as FormGroup;
  }

  public get getEmailPasswordFormValues(): any {
    return this.getEmailPasswordForm.value;
  }
  public get getEmailPasswordForm(): FormGroup {
    return this.form.get('emailPassword') as FormGroup;
  }

  public get getGeneralInformationFormValues(): any {
    return this.getGeneralInformationForm.value;
  }
  public get getGeneralInformationForm(): FormGroup {
    return this.form.get('generalInformation') as FormGroup;
  }
}
