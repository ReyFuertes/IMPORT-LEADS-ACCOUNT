import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/modules/service/storage.service';
import { GenericOnboardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'il-submitted',
  templateUrl: './submitted.component.html',
  styleUrls: ['./submitted.component.scss']
})
export class SubmittedComponent extends GenericOnboardingComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  constructor(router: Router, route: ActivatedRoute, storageService: StorageService, fb: FormBuilder) {
    super(router, route, storageService, fb);
  }

  ngOnInit(): void { }

  public done(): void {
    this.router.navigateByUrl(`onboarding/${this.id}`);
  }
}