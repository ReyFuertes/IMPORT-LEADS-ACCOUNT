import { Directive, Self, SkipSelf } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { StorageService } from 'src/app/modules/service/storage.service';
import { GenericDestroyPageComponent } from './generic-destroy-page';

@Directive()
export class GenericOnboardingComponent extends GenericDestroyPageComponent {
  public form: FormGroup;

  constructor(@Self() private storageService: StorageService, private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      emailPassword: this.fb.group({
        username: [null, Validators.compose([Validators.required])],
        password: [null, Validators.required]
      }),
      generalInformation: this.fb.group({
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        phoneNumber: [null, Validators.required],
        address: [null, Validators.required],
        companyName: [null, Validators.required],
        companyAddress: [null, Validators.required],
        language: [null, Validators.required]
      }),
      users: new FormArray([]),
    });

    this.form.valueChanges.pipe(takeUntil(this.$unsubscribe)).subscribe(res => {
      if (res) {
        this.storageService.set('onboarding', res);
      }
    })
    console.log('getStorageValues', this.getStorageValues)
    if(this.getStorageValues) {
      this.form.patchValue(this.getStorageValues);
    }
  }

  public get getStorageValues(): any {
    return this.storageService.get('onboarding');
  }

  public get getGeneralInformationFormValues(): any {
    return this.getGeneralInformationForm.value;
  }

  public get getEmailPasswordForm(): FormGroup {
    return this.form.get('emailPassword') as FormGroup;
  }

  public get getGeneralInformationForm(): FormGroup {
    return this.form.get('generalInformation') as FormGroup;
  }
}
