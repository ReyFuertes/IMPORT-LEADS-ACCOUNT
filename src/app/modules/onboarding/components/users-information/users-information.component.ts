import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  public columnsToDisplay = ['username', 'role', 'access', 'actions'];
  public roles: ISimpleItem[];

  constructor(private _storageService: StorageService, private store: Store<RootState>, storageService: StorageService, fb: FormBuilder, private dialog: MatDialog, private router: Router) {
    super(storageService, fb);
    this.store.pipe(select(getUserRolesSelector)).subscribe(values => this._storageService.set('r_l_s', JSON.stringify(values)));
    this.store.pipe(select(getUserAccessSelector)).subscribe(values => this._storageService.set('_cc_s', JSON.stringify(values)));
  }

  ngOnInit(): void {
    if (this.getUserFormValues) {
      this.dataSource = this.getStorageValues?.users;
    }
  }

  public getValue(values: string[], index: string): any {
    const value = this._storageService.get(index);
    if (!value) return [];

    let arr = JSON.parse(this._storageService.get(index)) || [];

    const results = arr?.filter(o => values.includes(o?.value));
    return results;
  }

  public splitToArray(str: string): any[] {
    return str.split(',');
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

      });
  }

  public onDeleteUser(selectedItem: any): void {
    this.removeUser(selectedItem);
  }

  public onPrev(): void {
    this.router.navigateByUrl('onboarding/company-information');
  }

  public onNext(): void {
    this.router.navigateByUrl('onboarding/onboarding-review');
  }
}
