import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const DUMMY_DATA: any[] = [
  { id: 1, username: 'testclient@testing.com', Position: '', Role: 'Admin', company_name: 'Test Company 1', phone: '0612345678', access: '' },
  { id: 2,username: 'angela@chinaimportleads.com', Position: '', Role: 'Client', company_name: 'Test Company 2', phone: '0612345678', access: '' },
  { id: 3, username: 'jamesmoore@gmail.com', Position: '', Role: 'Master', company_name: 'Test Company 3', phone: '0612345678', access: '' }
];
@Component({
  selector: 'il-sign-up-review',
  templateUrl: './sign-up-review.component.html',
  styleUrls: ['./sign-up-review.component.scss']
})
export class SignUpReviewComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  public form: FormGroup;
  public columnsToDisplay = ['id', 'username', 'position', 'role', 'company_name', 'phone', 'access'];
  public dataSource = DUMMY_DATA;
  
  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      address: [null, Validators.required],
      companyName: [null, Validators.required],
      companyAddress: [null, Validators.required],
      language: [null, Validators.required]
    });
  }

  ngOnInit(): void { }

  public onNext(): void {
  }

  public onPrev(): void {
    this.router.navigateByUrl('sign-up/users-information');
  }
}
