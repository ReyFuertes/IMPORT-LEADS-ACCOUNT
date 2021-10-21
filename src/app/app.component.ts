import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { loadUserAccessAction } from './store/actions/app.action';
import { RootState } from './store/root.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'Import Leads Wizard';
  public $notify: Observable<any>;
  public isLoggedIn: boolean = false;
  public svgPath: string = environment.svgPath;
  public hideTopNav: boolean = false;

  constructor(private store: Store<RootState>) {
    this.store.dispatch(loadUserAccessAction());
  }

  ngOnInit(): void {

  }
}
