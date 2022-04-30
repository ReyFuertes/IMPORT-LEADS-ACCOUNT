import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/modules/service/storage.service';
import { GenericOnboardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { RootState } from 'src/app/store/root.reducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'il-submitted',
  templateUrl: './submitted.component.html',
  styleUrls: ['./submitted.component.scss']
})
export class SubmittedComponent extends GenericOnboardingComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  constructor(store: Store<RootState>, router: Router, route: ActivatedRoute, storageService: StorageService, fb: FormBuilder) {
    super(store, router, route, storageService, fb);
  }

  ngOnInit(): void { 
    setTimeout(() => {
      this.done();
    }, 30000);
  }

  public done(): void {
    window.location.href = this.doneRedirectUrl;
    this.storageService.clear();
  }
}