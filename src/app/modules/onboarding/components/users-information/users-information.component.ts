import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IRole } from 'src/app/models/generic.model';
import { IUser } from 'src/app/models/user.model';
import { AddUserDialogComponent } from 'src/app/modules/dialog/components/add-user-dialog/add-user-dialog.component';
import { StorageService } from 'src/app/modules/service/storage.service';
import { GenericOnboardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { RootState } from 'src/app/store/root.reducer';
import { environment } from 'src/environments/environment';
import { getUserAccessSelector, getUserRolesSelector } from 'src/app/store/selectors/app.selector';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';


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
    this.store.pipe(select(getUserRolesSelector)).subscribe(values => this._storageService.set('r_l_s', JSON.stringify(values)));
    this.store.pipe(select(getUserAccessSelector)).subscribe(values => this._storageService.set('_cc_s', JSON.stringify(values)));
    this.formUsersArray = this.form.get('users') as FormArray;
  }

  ngOnInit(): void {
    this.dataSource = this.getStorageValues?.users;
    this.formUsersArray.patchValue(this.getStorageValues?.users);
  }

  public onAddUser(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '550px',
      height: '385px',
      data: { action: 0 }
    });
    dialogRef.afterClosed().subscribe((result: IUser) => {
      if (result) {
        const user: IUser = {
          firstname: result?.firstname,
          lastname: result?.lastname,
          username: result?.username,
          password: result?.password,
          access: result?.access,
          roles: result?.roles
        }
        this.addUser(user);
        this.dataSource = this.formUsersArray.value;
        
        this.setStorageValue('onboarding');
      }
    });
  }

  public onEditUser(selectedItem: any): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '550px',
      height: '385px',
      data: { action: 1, selectedItem }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
      .subscribe(result => {
        if (result) {
          const user: IUser = {
            firstname: result?.firstname,
            lastname: result?.lastname,
            username: result?.username,
            password: result?.password,
            access: result?.access,
            roles: result?.roles
          }
          this.onDeleteUser(user);
          this.addUser(user);
          this.dataSource = this.formUsersArray.value;
          this.setStorageValue('onboarding');
        }
      });
  }

  public onDeleteUser(selectedItem: any): void {
    this.removeUser(selectedItem);
  }

  public onPrev(): void {
    this.router.navigateByUrl(`onboarding/company-information/${this.id}`);
  }

  public onNext(): void {
    super.onNext(`onboarding/review/${this.id}`);
  }
}
