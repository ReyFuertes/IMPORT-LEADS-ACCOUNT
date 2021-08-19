import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'il-sign-up-review',
  templateUrl: './sign-up-review.component.html',
  styleUrls: ['./sign-up-review.component.scss']
})
export class SignUpReviewComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  public form: FormGroup;

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
