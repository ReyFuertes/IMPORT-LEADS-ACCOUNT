import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'il-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.scss']
})
export class CompanyInformationComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  public svgPath: string = environment.svgPath;
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

  public onPrev(): void {
    this.router.navigateByUrl('sign-up');
  }

  public onNext(): void {
    
  }
}
