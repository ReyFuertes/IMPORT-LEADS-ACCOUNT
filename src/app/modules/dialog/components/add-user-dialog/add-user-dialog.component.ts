import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IRole } from 'src/app/models/generic.model';
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

  constructor(private store: Store<RootState>, private fb: FormBuilder, public dialogRef: MatDialogRef<AddUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      username: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex.email)])],
      password: [null, Validators.required],
      access: [null, Validators.required],
      roles: [null, Validators.required],
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
