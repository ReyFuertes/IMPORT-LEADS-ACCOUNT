import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IUser } from 'src/app/models/user.model';
import { AddUserDialogComponent } from 'src/app/modules/dialog/components/add-user-dialog/add-user-dialog.component';
import { StorageService } from 'src/app/modules/service/storage.service';
import { GenericOnboardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { RootState } from 'src/app/store/root.reducer';
import { environment } from 'src/environments/environment';
import { getUserAccessSelector, getUserRolesSelector } from 'src/app/store/selectors/app.selector';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { isUserModifiedName } from 'src/app/shared/constants/onboarding';
import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';
import { isUserInvitedAction } from '../../store/onboarding.actions';
import { notificationFailedAction } from 'src/app/store/actions/notification.action';
import { ConfirmationComponent } from 'src/app/modules/dialog/components/confirmation/confirmation.component';

@Component({
  selector: 'il-users-information',
  templateUrl: './users-information.component.html',
  styleUrls: ['./users-information.component.scss']
})
export class UsersInformationComponent extends GenericOnboardingComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  public columnsToDisplay = ['username', 'firstname', 'lastname', 'role', 'access', 'actions'];
  public roles: ISimpleItem[];

  constructor(router: Router, route: ActivatedRoute, private _storageService: StorageService, store: Store<RootState>, storageService: StorageService, fb: FormBuilder, private dialog: MatDialog) {
    super(store, router, route, storageService, fb);
    this.store.pipe(select(getUserRolesSelector)).subscribe(values => this._storageService.set('roles', JSON.stringify(values)));
    this.store.pipe(select(getUserAccessSelector)).subscribe(values => this._storageService.set('access', JSON.stringify(values)));
  }

  ngOnInit(): void {
  }

  public onAddUser(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '550px',
      height: '385px',
      data: { action: 0 }
    });
    dialogRef.afterClosed().subscribe((newUser: IUser) => {
      if (newUser) {
        const isUserEmailExist = this.getUsersStorageValues?.find(value => value.username === newUser?.username) as IUser;
        if (isUserEmailExist) {
          this.store.dispatch(notificationFailedAction({ notification: { error: true, message: 'Failed: Email already exist.' } }));
          return;
        }

        const existingStorageUsers = Object.assign([], this.getUsersStorageValues);
        const formattedNewUser = {
          id: uuid(),
          profile: newUser?.profile,
          username: newUser?.username,
          password: newUser?.password,
          access: newUser?.access,
          roles: newUser?.roles
        };
        existingStorageUsers.splice(0, 0, formattedNewUser);
        const accumulatedUsers = existingStorageUsers;

        this.addUsersToForm(accumulatedUsers);
        this.setUsersToStorage();
        this.setUsersToDataSource(existingStorageUsers);
        this.setUserAsModified();
        this.checkSubscriberMaxReach();
      }
    });
  }

  private checkSubscriberMaxReach(): void {
    if (this.getUsersLength >= Number(this.subscription?.max_users)) {
      this.subscriberMaxUserReached = true;
    } else {
      this.subscriberMaxUserReached = false;
    }
  }

  public onEditUser(selectedItem: any): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '550px',
      height: '385px',
      data: { action: 1, selectedItem }
    });
    dialogRef.afterClosed()
      .subscribe(editedUser => {
        if (editedUser) {
          let modifiedUser: IUser;

          const isUserEmailExist = this.getUsersStorageValues.find(value =>
            value.username === editedUser?.username
            && value.id !== editedUser?.id) as IUser;
          if (isUserEmailExist) {
            this.store.dispatch(notificationFailedAction({ notification: { error: true, message: 'Failed: Email already exist.' } }));
            return;
          }
          
          const match = this.getUsersStorageValues?.find(value => value.id === editedUser?.id);
          const itemIndex = this.getUsersStorageValues?.findIndex(value => value.id === editedUser?.id);

          if (match) {
            this.onDeleteUser(editedUser);
            modifiedUser = {
              id: match?.id,
              profile: editedUser?.profile,
              username: editedUser?.username,
              password: editedUser?.password,
              access: editedUser?.access,
              roles: editedUser?.roles
            }
          }
          const existingStorageUsers = this.getUsersStorageValues;
          existingStorageUsers.splice(itemIndex, 0, modifiedUser);
          const accumulatedUsers = existingStorageUsers;

          this.addUsersToForm(accumulatedUsers);
          this.setUsersToStorage();
          this.setUsersToDataSource(existingStorageUsers);
          this.setUserAsModified();
          this.checkSubscriberMaxReach();
        }
      });
  }

  private setUserAsModified(): void {
    this.setStorageWithValue(isUserModifiedName, JSON.stringify(true));
  }

  public onRefresh(): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: { action: 1 }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(isUserInvitedAction({ id: this.id }));
        this.storageService.remove(isUserModifiedName);
      }
    });
  }

  public onDeleteUser(selectedItem: any): void {
    let formUsers = Object.assign([], this.getUsersForm.value) as IUser[];
    let storageUsers = Object.assign([], this.getUsersStorageValues) as IUser[];

    _.remove(formUsers, user => user.id === selectedItem?.id);
    _.remove(storageUsers, user => user.id === selectedItem?.id);

    this.addUsersToForm(formUsers);
    this.setUsersToStorage();
    this.setUserAsModified();
    this.checkSubscriberMaxReach();

    this.dataSource = formUsers;
  }

  public onPrev(): void {
    this.router.navigateByUrl(`onboarding/company-information/${this.id}`);
  }

  public onNext(): void {
    super.onNext(`onboarding/review/${this.id}`);
  }
}
