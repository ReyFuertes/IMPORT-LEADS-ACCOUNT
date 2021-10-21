import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, switchMap, takeUntil, filter, catchError } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { loadUserAccessAction, loadUserAccessSuccessAction } from '../actions/app.action';
import { RootState } from '../root.reducer';
import { IAccess } from 'src/app/models/generic.model';
import { AccessService } from 'src/app/services/api.service';

@Injectable()
export class AppEffects {
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
    private router: Router,
    private accessService: AccessService ) { }
}
