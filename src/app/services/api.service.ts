
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { IAccess } from '../models/user.model';
import { StorageService } from '../modules/service/storage.service';
import { IRole } from '../models/generic.model';

@Injectable({ providedIn: 'root' })
export class AccessService extends BaseService<IAccess> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'access', storageSrv);
  }
}
@Injectable({ providedIn: 'root' })
export class RolesService extends BaseService<IRole> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'roles', storageSrv);
  }
}