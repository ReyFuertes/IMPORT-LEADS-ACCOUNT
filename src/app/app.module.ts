import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { NumberOnlyDirective } from './shared/directives/number-only.directive';
import { InputMaxLengthDirective } from './shared/directives/input-maxlen.directive';
import { AppRoutingModule } from './app.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/effects/app.effect';
import { AccessService, SubscriptionService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { reducers } from './store/root.reducer';
import { AuthGuard } from './services/auth.guard';
import { SubscriptionsEffect } from './store/effects/subscription.effects';

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatCardModule
];

// const primeNgModules = [];

const directives = [
  NumberOnlyDirective,
  InputMaxLengthDirective,
];

const services = [
  AccessService,
  SubscriptionService
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FlexLayoutModule,
    ...materialModules,
    // ...primeNgModules,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AppEffects, SubscriptionsEffect]),
  ],
  providers: [AuthGuard, ...directives, ...services],
  bootstrap: [AppComponent]
})
export class AppModule { }
