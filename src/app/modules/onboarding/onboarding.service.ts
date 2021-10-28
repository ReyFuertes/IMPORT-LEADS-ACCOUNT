import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { StorageService } from '../service/storage.service';

@Injectable({ providedIn: 'root' })
export class OnboardingService extends BaseService<any> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'onboarding', storageSrv);
  }
}