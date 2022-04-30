import { AfterViewInit, Component, OnInit } from '@angular/core';
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
import { onboardCustomerAction } from '../../store/onboarding.actions';

@Component({
  selector: 'il-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class OnboardingReviewComponent extends GenericOnboardingComponent implements OnInit, AfterViewInit {
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

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.getUsersForm.patchValue(this.getUsersStorageValues);
    this.dataSource = this.getUsersStorageValues;
  }

  public get getSelectedLanguage(): string {
    return this.languageOptions.find(lang => lang.value === this.getGeneralInformationForm.get('language')?.value)?.label;
  }

  public onSubmit(): void {
    setTimeout(() => {
      if (this.isFormValid) {
        const payload = {
          email_password: this.getEmailPasswordStorageValues,
          profile: this.getGeneralInformationStorageValues,
          users: this.getUsersStorageValues
        }
        this.store.dispatch(onboardCustomerAction({ payload }));
      }
    }, 100);
    this.storageService.set('isSub', 1)
    this.router.navigateByUrl(`onboarding/submitted`);
  }

  public get isFormValid(): boolean {
    return this.getEmailPasswordStorageValues
      && this.getGeneralInformationStorageValues
      && this.getUsersStorageValues
  }

  public onPrev(): void {
    this.router.navigateByUrl(`onboarding/users-information/${this.id}`);
  }
}
