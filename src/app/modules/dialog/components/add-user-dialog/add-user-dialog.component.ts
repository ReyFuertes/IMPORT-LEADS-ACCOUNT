import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAccess } from 'src/app/models/user.model';
import { RootState } from 'src/app/store/root.reducer';
import { getUserAccessSelector } from 'src/app/store/selectors/app.selector';
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

  constructor(private store: Store<RootState>, private fb: FormBuilder, public dialogRef: MatDialogRef<AddUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      company: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      access: [null, Validators.required],
      role: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.$access = this.store.pipe(select(getUserAccessSelector));
    this.$access.subscribe(res => {
      console.log(res)
    })
  }

  public onAdd(): void {

  }
}
