import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAccess, IUser } from 'src/app/models/user.model';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { emailRegex } from 'src/app/shared/util/email';
import { RootState } from 'src/app/store/root.reducer';
import { getUserAccessSelector, getUserRolesSelector } from 'src/app/store/selectors/app.selector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'il-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  public form: FormGroup;
  public accessOptions: any[];
  public roleOptions: any[];
  public actionText: string[] = ['Add', 'Update'];
  public $access: Observable<IAccess[]>;
  public $roles: Observable<ISimpleItem[]>;
  public userPreSelectedAccess: string[] = [
    'a6ded0f0-af1e-471d-afe0-3891308d2bb3', //agreements
    '27a51b15-5587-4380-a2ca-21296e0a9b3e', // assessments
    '057ee2e2-cb7c-4e05-aea8-0f2b962ea150', //venues
    'e684b0c0-6450-44e5-b83c-d07470be8584', // products
    'b3401f0e-5495-45c3-87b7-1cf3abe7eac7' //tags
  ];
  public userPreSelectedRole: string[] = ['2a69d8c5-3434-4ab9-ba74-bfb465c09d05'];

  constructor(private store: Store<RootState>, private fb: FormBuilder, public dialogRef: MatDialogRef<AddUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      username: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex.email)])],
      password: [null, Validators.required],
      access: [this.userPreSelectedAccess, Validators.required],
      roles: [this.userPreSelectedRole, Validators.required],
    });
  }
  
  ngOnInit(): void {
    this.$access = this.store.pipe(select(getUserAccessSelector));
    this.$roles = this.store.pipe(select(getUserRolesSelector));
    
    if (this.data?.selectedItem) {
      this.form.patchValue(this.data?.selectedItem);
    }
  }

  public onAdd(): void {
    if (this.form.valid) {
      this.dialogRef.close(<IUser>this.form.value);
    }
  }

  public onUpdate(): void {
    if (this.form.valid) {
      this.dialogRef.close(<IUser>this.form.value);
    }
  }
}
