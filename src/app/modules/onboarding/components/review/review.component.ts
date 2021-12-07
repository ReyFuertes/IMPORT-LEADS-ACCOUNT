import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { StorageService } from 'src/app/modules/service/storage.service';
import { GenericOnboardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { RootState } from 'src/app/store/root.reducer';
import { environment } from 'src/environments/environment';
import { OnboardingService } from '../../onboarding.service';
import { createCustomerAction } from '../../store/onboarding.actions';

@Component({
  selector: 'il-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class OnboardingReviewComponent extends GenericOnboardingComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  public form: FormGroup;
  public columnsToDisplay = ['username', 'firstname', 'lastname', 'role', 'access'];
  public dataSource: any;
  public languageOptions: ISimpleItem[] = [{
    label: 'English',
    value: 'en'
  }, {
    label: 'Chinese',
    value: 'cn'
  }];

  constructor(router: Router, route: ActivatedRoute, storageService: StorageService, fb: FormBuilder, store: Store<RootState>) {
    super(store, router, route, storageService, fb);
  }

  ngOnInit(): void {
    this.dataSource = this.getStorageValues?.users;
  }

  public get getSelectedLanguage(): string {
    return this.languageOptions.find(lang => lang.value === this.getGeneralInformationForm.get('language')?.value)?.label;
  }

  public onSubmit(): void {
    setTimeout(() => {
      if (this.getEmailPasswordForm.valid && this.getGeneralInformationForm.valid) {
        this.store.dispatch(createCustomerAction({
          payload: {
            email_password: this.getEmailPasswordFormValues,
            general_information: this.getGeneralInformationFormValues,
            user_information: this.getUserFormValues
          }
        }))
      }
    }, 100);
    //this.router.navigateByUrl(`onboarding/submitted`);
  }

  public onPrev(): void {
    this.router.navigateByUrl(`onboarding/users-information/${this.id}`);
  }
}
