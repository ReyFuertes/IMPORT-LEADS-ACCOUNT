import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/modules/service/storage.service';
import { GenericOnboardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { RootState } from 'src/app/store/root.reducer';

@Component({
  selector: 'il-email-password',
  templateUrl: './email-password.component.html',
  styleUrls: ['./email-password.component.scss']
})
export class EmailPasswordComponent extends GenericOnboardingComponent implements OnInit {
  
  public loginError: boolean = false;

  constructor(store: Store<RootState>, router: Router, route: ActivatedRoute, storageService: StorageService, fb: FormBuilder) {
    super(store, router, route, storageService, fb);
  }

  ngOnInit(): void {
    this.getEmailPasswordForm.patchValue(this.getEmailPasswordStorageValues);
  }

  public onNext(): void {
    this.setEmailPasswordToStorage();
    super.onNext(`onboarding/company-information/${this.id}`);
  }
}