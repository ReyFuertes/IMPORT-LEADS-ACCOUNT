import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'il-email-password',
  templateUrl: './email-password.component.html',
  styleUrls: ['./email-password.component.scss']
})
export class EmailPasswordComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  public loginError: boolean = false;

  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.required]
    });
   }

  ngOnInit(): void { }

  public onNext(): void {
    this.router.navigateByUrl('onboarding/company-information');
  }

  public onPrev(): void {
  }
}
