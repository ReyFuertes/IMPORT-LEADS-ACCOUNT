import { Directive } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
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
import { ISubscription } from 'src/app/models/generic.model';
import { passwordValidator } from '../util/password';

@Directive()
export class GenericOnboardingComponent extends GenericDestroyPageComponent {
  public imgPath: string = environment.imgPath;
  public form: FormGroup;
  public formUsersArray: FormArray;
  public dataSource: any;
  public id: string;
  public invitedUser: IUser;
  public subscriptions: ISimpleItem[];
  public subscription: ISubscription;
  public subscriberMaxUserReached: boolean;

  constructor(public store: Store<RootState>, public router: Router, private route: ActivatedRoute, public storageService: StorageService, private fb: FormBuilder) {
    super();
    //check if the user is invited
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.store.dispatch(isUserInvitedAction({ id: this.id }));
    };

    //intialize the form wizard
    this.form = this.fb.group({
      subscription: [null, Validators.required],
      emailPassword: this.fb.group({
        id: [null, Validators.required],
        username: [null, Validators.compose([Validators.required])],
        password: [null, Validators.required],
        confirm_password: [null, Validators.required]
      }, {
        validator: passwordValidator('password', 'confirm_password')
      }),
      generalInformation: this.fb.group({
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        phone_number: [null, Validators.required],
        address: [null, Validators.required],
        company_name: [null, Validators.required],
        company_address: [null, Validators.required],
        language: ['en', Validators.required]
      }),
      users: [null, Validators.required]
    });

    //initialize the form array for customer users
    this.formUsersArray = this.form.get('users') as FormArray;

    //load the subscription options
    this.store.pipe(select(getSubscriptionsSelector), takeUntil(this.$unsubscribe))
      .subscribe(subscriptions => {
        this.subscriptions = subscriptions?.map(sub => ({ label: sub.name, value: sub.id }));
      });

    //we need to display the invited customer information and its subscription
    this.store.pipe(select(getIsUserInvitedSelector)).subscribe(invitedUser => {
      this.invitedUser = invitedUser;
      this.getEmailPasswordForm.get('id').patchValue(this.invitedUser?.id, { emitEvent: false });
      this.getEmailPasswordForm.get('username').patchValue(this.invitedUser?.username, { emitEvent: false });
      if (!this.getUsersForm.value) {
        this.getUsersForm.patchValue(this.invitedUser?.customer_users);
        this.dataSource = this.invitedUser?.customer_users;
      }
      this.form.get('generalInformation').patchValue(this.invitedUser?.profile);
      this.form.get('subscription').patchValue(this.invitedUser?.subscription);
    });
    
    //listen to subscription change so we can display the subscription name in the dropdown
    this.form.get('subscription').valueChanges.subscribe(subscriberId => {
      if (subscriberId) {
        this.store.pipe(select(getSubscriptionByIdSelector(subscriberId)))
          .subscribe(subscription => {
            this.subscription = subscription;
            this.subscriberMaxUserReached = Number(this.dataSource?.length) >= Number(this.subscription?.max_users);
          });
      }
    });
  }

  public get getUsersLength(): number {
    return this.form.get('users')?.value?.length || 0;
  }

  public onNext(url: string): void {
    this.router.navigateByUrl(url);
  }

  public onPrev(url: string): void {
    this.router.navigateByUrl(url);
  }

  public setStorageValue(name: string): void {
    this.storageService.set(name, this.form.value);
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

  public splitToArray(str: string): any[] {
    return str.split(',');
  }

  public removeUser(item: any): void {
    let updatedFormUsers = this.form.get('users').value;
    _.remove(updatedFormUsers, user => user.username === item?.username);
    this.dataSource = updatedFormUsers;

    this.setUsersToStorage();
  }

  public addUsersToForm(users: IUser[]): any {
    this.getUsersForm.patchValue(users);
  }

  public setEmailPasswordToStorage(): void {
    this.storageService.set('emailPassword', this.getEmailPasswordForm.value);
  }

  public setGeneralInformationToStorage(): void {
    this.storageService.set('generalInformation', this.getGeneralInformationForm.value);
  }

  public setUsersToStorage(): void {
    this.storageService.set('users', this.getUsersForm.value);
  }

  public get getUsersStorageValues(): any {
    let customerUsers = this.storageService.get('users') || [];
    if (customerUsers?.length > 0) {
      if(Array.isArray(customerUsers)) {
        customerUsers = customerUsers;
      } else {
        customerUsers = JSON.parse(customerUsers);
      }
    }
    console.log('getUsersStorageValues', customerUsers)
    return customerUsers;
  }

  public get getEmailPasswordStorageValues(): any {
    return this.storageService.get('emailPassword');
  }

  public get getGeneralInformationStorageValues(): any {
    return this.storageService.get('generalInformation');
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
