import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'il-submitted',
  templateUrl: './submitted.component.html',
  styleUrls: ['./submitted.component.scss']
})
export class SubmittedComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  constructor(private router: Router) { }

  ngOnInit(): void { }

  public done(): void {
    this.router.navigateByUrl('onboarding');
  }
}