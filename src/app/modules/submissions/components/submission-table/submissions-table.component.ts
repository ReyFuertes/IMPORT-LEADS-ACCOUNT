import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const DUMMY_DATA: any[] = [
  { id: 1, username: 'testclient@testing.com', company_name: 'Test Company 1', date: '09/13/2021', status: 'Pending' },
  { id: 2, username: 'angela@chinaimportleads.com', company_name: 'Test Company 2', date: '09/12/2021', status: 'Pending' },
  { id: 3, username: 'jamesmoore@gmail.com', company_name: 'Test Company 3', date: '09/11/2021', status: 'Approved' }
];

@Component({
  selector: 'il-submissions-table',
  templateUrl: './submissions-table.component.html',
  styleUrls: ['./submissions-table.component.scss']
})
export class SubmissionsTableComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  public columnsToDisplay = ['id', 'username', 'company_name', 'date', 'status', 'action'];
  public dataSource = DUMMY_DATA;

  constructor(private router: Router) { }

  ngOnInit(): void { }
}
