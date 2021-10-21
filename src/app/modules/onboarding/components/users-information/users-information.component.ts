import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AddUserDialogComponent } from 'src/app/modules/dialog/components/add-user-dialog/add-user-dialog.component';
import { StorageService } from 'src/app/modules/service/storage.service';
import { GenericOnboardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { environment } from 'src/environments/environment';

const DUMMY_DATA: any[] = [
  { username: 'testclient@testing.com', position: '', role: 'Admin', company_name: 'Test Company 1', phone: '0612345678', access: '' },
  { username: 'angela@chinaimportleads.com', position: '', role: 'Client', company_name: 'Test Company 2', phone: '0612345678', access: '' },
  { username: 'jamesmoore@gmail.com', position: '', role: 'Master', company_name: 'Test Company 3', phone: '0612345678', access: '' }
];

@Component({
  selector: 'il-users-information',
  templateUrl: './users-information.component.html',
  styleUrls: ['./users-information.component.scss']
})
export class UsersInformationComponent extends GenericOnboardingComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  public columnsToDisplay = ['username', 'position', 'role', 'company_name', 'phone', 'access', 'actions'];
  public dataSource = DUMMY_DATA;

  constructor(storageService: StorageService, fb: FormBuilder, private dialog: MatDialog, private router: Router) {
    super(storageService, fb);
  }

  ngOnInit(): void { }

  public onAddUser(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '675px',
      height: '375px',
      data: {
        action: 0
      }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
      .subscribe(result => {

      });
  }

  public onEditUser(element: any): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '675px',
      height: '375px',
      data: {
        action: 1
      }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
      .subscribe(result => {

      });
  }

  public onDeleteUser(element: any): void { }

  public onPrev(): void {
    this.router.navigateByUrl('onboarding/company-information');
  }

  public onNext(): void {
    this.router.navigateByUrl('onboarding/onboarding-review');
  }
}
