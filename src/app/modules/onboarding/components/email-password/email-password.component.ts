import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/modules/service/storage.service';
import { GenericOnboardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { RootState } from 'src/app/store/root.reducer';
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
  public isReadOnly: boolean = true;

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