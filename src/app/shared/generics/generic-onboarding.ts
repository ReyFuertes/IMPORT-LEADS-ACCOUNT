import { Directive } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProfile, IUser } from 'src/app/models/user.model';
import { StorageService } from 'src/app/modules/service/storage.service';
import { environment } from 'src/environments/environment';
import { GenericDestroyPageComponent } from './generic-destroy-page';
import * as _ from 'lodash';
import { select, Store } from '@ngrx/store';
import { RootState } from 'src/app/store/root.reducer';
import { isUserInvitedAction } from 'src/app/modules/onboarding/store/onboarding.actions';
import { getIsUserInvitedSelector } from 'src/app/modules/onboarding/store/onboarding.selector';
import { getSubscriptionByIdSelector, getSubscriptionsSelector } from 'src/app/store/selectors/subscription.selector';
import { takeUntil } from 'rxjs/operators';
import { ISimpleItem } from './generic.model';
import { ISubscription, SubmissionType } from 'src/app/models/generic.model';
import { passwordValidator } from '../util/password';
import { confirmPasswordName, emailPasswordName, generalInformationName, idName, isSubmittedName, isUserModifiedName, isUserName, passwordName, subscriptionName, usernameName, usersName } from '../constants/onboarding';

@Directive()
export class GenericOnboardingComponent extends GenericDestroyPageComponent {
  public imgPath: string = environment.imgPath;
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  public dataSource: any;
  public id: string;
  public invitedUser: IUser;
  public subscriptions: ISimpleItem[];
  public subscription: ISubscription;
  public subscriberMaxUserReached: boolean;
  public isUserValid: boolean | null = null;
  public doneRedirectUrl: string = environment.redirectUrl;

  constructor(public store: Store<RootState>, public router: Router, private route: ActivatedRoute, public storageService: StorageService, private fb: FormBuilder) {
    super();
    this.id = this.route.snapshot.paramMap.get(idName);
    if (this.id) {
      this.store.dispatch(isUserInvitedAction({ id: this.id }));
    };

    this.form = this.fb.group({
      subscription: [null, Validators.required],
      emailPassword: this.fb.group({
        id: [null, Validators.required],
        username: [null, [Validators.required, Validators.email]],
        // password: [null, [Validators.required, Validators.minLength(6)]],
        // confirm_password: [null, [Validators.required, Validators.minLength(6)]],
        // , {
        //   validator: passwordValidator(passwordName, confirmPasswordName)
        // }
      }),
      generalInformation: this.fb.group({
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        phone: [null, Validators.required],
        address: [null, Validators.required],
        company_name: [null, Validators.required],
        company_address: [null, Validators.required],
        language: [null, Validators.required]
      }),
      users: [null, Validators.required],
      is_user: [null]
    });

    this.store.pipe(select(getSubscriptionsSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(subscriptions => {
        this.subscriptions = subscriptions?.map(sub => ({ label: sub.name, value: sub.id }));
      });

    this.store.pipe(select(getIsUserInvitedSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(invitedUser => {
        if (invitedUser === null) return;

        if (invitedUser) {
          this.isUserValid = true;
          
          this.invitedUser = invitedUser;

          this.getEmailPasswordForm.get(idName).patchValue(this.invitedUser?.id, { emitEvent: false });
          this.getEmailPasswordForm.get(usernameName).patchValue(this.invitedUser?.username, { emitEvent: false });

          if (invitedUser?.is_submitted === SubmissionType.submitted) {
            this.storageService.set(isSubmittedName, SubmissionType.submitted);
          } else {
            this.storageService.set(isSubmittedName, SubmissionType.pending);
          }
          this.checkIfSubmitted();

          if (this.invitedUser?.is_user === true) {
            this.form.get(isUserName).patchValue(this.invitedUser.is_user, { emitEvent: false });
            this.form.get(subscriptionName).setValidators(null);
          } else {
            this.form.get(subscriptionName).setValidators(Validators.required);
          }
          this.form.get(subscriptionName).updateValueAndValidity();

          this.dataSource = this.getUsersStorageValues;
          this.getUsersForm.patchValue(this.getUsersStorageValues);
          
          if (!this.getGeneralInformationStorageValues) {
            const profile = this.formatProfile(this.invitedUser?.profile);
            this.form.get(generalInformationName).patchValue(profile);
          } else {
            this.getGeneralInformationForm.patchValue(this.getGeneralInformationStorageValues);
          }

          this.form.get(subscriptionName).patchValue(this.invitedUser?.subscription);
        } else {
          this.isUserValid = false;
        }
      });

    this.form.get(subscriptionName).valueChanges
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(subscriberId => {
        if (subscriberId) {
          this.store.pipe(select(getSubscriptionByIdSelector(subscriberId)))
            .subscribe(subscription => {
              this.subscription = subscription;
              this.subscriberMaxUserReached = Number(this.dataSource?.length) >= Number(this.subscription?.max_users);
            });
        }
      });

    this.form.get(generalInformationName).valueChanges
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(generalInformation => {
        this.setStorageWithValue(generalInformationName, JSON.stringify(generalInformation));
      });
  }

  public formatProfile(profile: IProfile): any {
    return {
      id: profile?.id || null,
      address: profile?.address || null,
      api_url: profile?.api_url || null,
      company_address: profile?.company_address || null,
      company_name: profile?.company_name || null,
      database_name: profile?.database_name || null,
      firstname: profile?.firstname || null,
      language: profile?.language || 'en',
      lastname: profile?.lastname || null,
      phone: profile?.phone || null,
      website_url: profile?.website_url || null,
    }
  }

  public get isUsersModified(): boolean {
    let isUserModified: boolean = false;
    if (this.storageService.get(isUserModifiedName)) {
      isUserModified = JSON.parse(this.storageService.get(isUserModifiedName));
    }
    return isUserModified;
  }

  public setUsersToStorage(): void {
    this.checkSetType(this.getUsersForm, usersName);
  }

  public get getUsersStorageValues(): any {
    let customerUsers: any[] = [];
    if (this.isUsersModified === false) {
      customerUsers = this.invitedUser?.customer_users;
    } else {
      const userFromStorage = this.storageService.get(usersName) || [];
      if (typeof (userFromStorage) === 'string') {
        customerUsers = JSON.parse(userFromStorage);
      } else {
        customerUsers = userFromStorage;
      }
    }
    return customerUsers;
  }

  public checkIfSubmitted(): void {
    if (this.isSubmitted === true) {
      window.location.href = this.doneRedirectUrl;
    }
  }

  public get isUserLoading(): boolean {
    return this.isUserValid === null;
  }

  public get isUserValidated(): boolean {
    return this.isUserValid === true;
  }

  public get isUserInvalid(): boolean {
    return this.isUserValid === false;
  }

  public get isUser(): boolean {
    return !!this.form.get('is_user')?.value;
  }

  public get getUsersLength(): number {
    return this.form.get(usersName)?.value?.length || 0;
  }

  public onNext(url: string): void {
    this.router.navigateByUrl(url);
  }

  public onPrev(url: string): void {
    this.router.navigateByUrl(url);
  }

  public setStorageFormValue(name: string): void {
    this.storageService.set(name, this.form.value);
  }

  public setStorageWithValue(name: string, value: any): void {
    this.storageService.set(name, value);
  }

  public getStorageValue(values: string[], index: string): any[] {
    const value = this.storageService.get(index);
    if (!value) return [];

    let storageArr = this.storageService.get(index);
    if (storageArr) {
      storageArr = JSON.parse(this.storageService.get(index)) || [];
    } else {
      return [];
    }
    const results = storageArr?.filter(o => {
      return values?.includes(o?.value);
    });
    return results;
  }

  public removeUser(item: IUser): void {

  }

  public setUsersToDataSource(users: IUser[]): void {
    this.dataSource = users;
    debugger
  }

  public addUsersToForm(users: IUser[]): any {
    this.getUsersForm.reset();
    this.getUsersForm.patchValue(users);
  }

  public setEmailPasswordToStorage(): void {
    this.storageService.set(emailPasswordName, this.getEmailPasswordForm.value);
  }

  private checkSetType(form: FormGroup, name: string): any {
    if (typeof (form.value) !== 'string') {
      this.storageService.set(name, JSON.stringify(form.value));
    } else {
      this.storageService.set(name, form.value);
    }
  }

  private checkGetType(name: string): any {
    let returnValue: any;
    const value = this.storageService.get(name);
    if (value !== '' && typeof (value) === 'string') {
      returnValue = JSON.parse(value);
    } else if (value === '') {
      returnValue = null;
    } else {
      returnValue = value;
    }
    return returnValue;
  }

  public setGeneralInformationToStorage(): void {
    this.checkSetType(this.getGeneralInformationForm, generalInformationName);
  }

  public get isSubmitted(): any {
    return this.storageService.get(isSubmittedName) === 1;
  }

  public get getEmailPasswordStorageValues(): any {
    return this.storageService.get(emailPasswordName);
  }

  public get getGeneralInformationStorageValues(): any {
    return this.checkGetType(generalInformationName);
  }

  public get getUsersForm(): FormGroup {
    return this.form.get(usersName) as FormGroup;
  }

  public get getEmailPasswordForm(): FormGroup {
    return this.form.get(emailPasswordName) as FormGroup;
  }

  public get getGeneralInformationForm(): FormGroup {
    return this.form.get(generalInformationName) as FormGroup;
  }
}
