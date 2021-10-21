import { Component, OnInit, Self, SkipSelf } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/modules/service/storage.service';
import { GenericOnboardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'il-email-password',
  templateUrl: './email-password.component.html',
  styleUrls: ['./email-password.component.scss']
})
export class EmailPasswordComponent extends GenericOnboardingComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  public loginError: boolean = false;

  constructor(storageService: StorageService, fb: FormBuilder, private router: Router) {
    super(storageService, fb);
  }

  ngOnInit(): void { }

  public onNext(): void {
    this.router.navigateByUrl('onboarding/company-information');
  }

  public onPrev(): void {
  }
}
