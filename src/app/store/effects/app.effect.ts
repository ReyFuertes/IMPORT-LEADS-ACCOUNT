import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, switchMap, takeUntil, filter, catchError } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { loadAllRolesAction, loadAllRolesSuccessAction, loadUserAccessAction, loadUserAccessSuccessAction } from '../actions/app.action';
import { RootState } from '../root.reducer';
import { IAccess, IRole } from 'src/app/models/generic.model';
import { AccessService, RolesService } from 'src/app/services/api.service';

@Injectable()
export class AppEffects {
  loadAllRolesAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadAllRolesAction),
    switchMap(() => {
      return this.roleService.getAll().pipe(
        map((response: IRole[]) => {
          return loadAllRolesSuccessAction({ response });
        })
      )
    })
  ));
  loadUserAccessAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadUserAccessAction),
    switchMap(() => {
      return this.accessService.getAll().pipe(
        map((response: IAccess[]) => {
          return loadUserAccessSuccessAction({ response });
        })
      )
    })
  ));

  constructor(private store: Store<RootState>, 
    private actions$: Actions,
    private roleService: RolesService,
    private accessService: AccessService ) { }
}
