import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IUser } from 'src/app/models/user.model';
import { StorageService } from 'src/app/modules/service/storage.service';
import { GenericOnboardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { RootState } from 'src/app/store/root.reducer';
import { environment } from 'src/environments/environment';
import { getIsUserInvitedSelector } from '../../store/onboarding.selector';

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
  public isUserInvited: IUser;

  constructor(store: Store<RootState>, router: Router, route: ActivatedRoute, storageService: StorageService, fb: FormBuilder) {
    super(store, router, route, storageService, fb);
  }

  ngOnInit(): void {
    this.store.pipe(select(getIsUserInvitedSelector)).subscribe(isInvited => {
      this.isUserInvited = isInvited;
      this.getEmailPasswordForm.get('id').patchValue(this.isUserInvited?.id);
      this.getEmailPasswordForm.get('username').patchValue(this.isUserInvited?.username);
    });
  }

  public onNext(): void {
    super.onNext(`onboarding/company-information/${this.id}`);
  }
}