import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/modules/service/storage.service';
import { GenericOnboardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'il-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent extends GenericOnboardingComponent implements OnInit {
  public languageOptions: ISimpleItem[] = [{
    label: 'English',
    value: 'en'
  }, {
    label: 'Chinese',
    value: 'cn'
  }];
  constructor(storageService: StorageService, private router: Router, fb: FormBuilder) {
    super(storageService, fb);
  }

  ngOnInit(): void { }

  public onPrev(): void {
    this.router.navigateByUrl('onboarding');
  }

  public onNext(): void {
    this.router.navigateByUrl('onboarding/users-information');
  }
}
