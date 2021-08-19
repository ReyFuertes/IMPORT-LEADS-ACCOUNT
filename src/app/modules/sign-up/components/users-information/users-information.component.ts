import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const DUMMY_DATA: any[] = [
  { id: 1, username: 'testclient@testing.com', Position: '', Role: 'Admin', company_name: 'Test Company 1', phone: '0612345678', access: '' },
  { id: 2,username: 'angela@chinaimportleads.com', Position: '', Role: 'Client', company_name: 'Test Company 2', phone: '0612345678', access: '' },
  { id: 3, username: 'jamesmoore@gmail.com', Position: '', Role: 'Master', company_name: 'Test Company 3', phone: '0612345678', access: '' }
];

@Component({
  selector: 'il-users-information',
  templateUrl: './users-information.component.html',
  styleUrls: ['./users-information.component.scss']
})
export class UsersInformationComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  public columnsToDisplay = ['id', 'username', 'position', 'role', 'company_name', 'phone', 'access'];
  public dataSource = DUMMY_DATA;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  public onPrev(): void {
    this.router.navigateByUrl('sign-up/company-information');
  }

  public onNext(): void {
    this.router.navigateByUrl('sign-up/sign-up-review');
  }
}
