import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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

  ngOnInit(): void { }

  public onAdd(): void {

  }
}
