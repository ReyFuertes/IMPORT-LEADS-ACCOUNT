import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/modules/service/storage.service';
import { GenericOnboardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { RootState } from 'src/app/store/root.reducer';
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
  constructor(store: Store<RootState>, router: Router, route: ActivatedRoute, storageService: StorageService, fb: FormBuilder) {
    super(store, router, route, storageService, fb);
  }

  ngOnInit(): void {
    this.getGeneralInformationForm.patchValue(this.getGeneralInformationStorageValues);
  }

  public onPrev(): void {
    super.onPrev(`onboarding/${this.id}`);
  }

  public onNext(): void {
    this.setGeneralInformationToStorage();
    super.onNext(`onboarding/users-information/${this.id}`);
  }
}
