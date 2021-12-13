import { NgModule } from '@angular/core';
import { EmailPasswordComponent } from './components/email-password/email-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GeneralInformationComponent } from './components/general-information/general-information.component';
import { UsersInformationComponent } from './components/users-information/users-information.component';
import { MatTableModule } from '@angular/material/table';
import { SubmittedComponent } from './components/submitted/submitted.component';
import { OnboardingContainerComponent } from './container/onboarding-container.component';
import { OnboardingReviewComponent } from './components/review/review.component';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from '../dialog/dialog.module';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';
import { OnboardingService } from './onboarding.service';
import { EffectsModule } from '@ngrx/effects';
import { OnboardingEffects } from './store/onboarding.effects';
import { AuthGuard } from 'src/app/services/auth.guard';
import { SubscriptionsEffect } from 'src/app/store/effects/subscription.effects';

const primengModules = [
  InputTextModule,
  CardModule,
  ButtonModule,
  CheckboxModule,
  TooltipModule
];

const materialModules = [
  MatCardModule,
  MatButtonModule,
  MatTableModule
];

const routes: Routes = [{
  path: '',
  component: OnboardingContainerComponent,
  children: [{
    path: 'submitted',
    component: SubmittedComponent
  }, {
    path: ':id',
    component: EmailPasswordComponent,
  }, {
    path: 'company-information/:id',
    component: GeneralInformationComponent
  }, {
    path: 'users-information/:id',
    component: UsersInformationComponent
  }, {
    path: 'review/:id',
    component: OnboardingReviewComponent
  }, {
    path: '**', pathMatch: 'full',
    component: PageNotFoundComponent
  }],
}];
@NgModule({
  declarations: [
    OnboardingContainerComponent,
    EmailPasswordComponent,
    GeneralInformationComponent,
    UsersInformationComponent,
    OnboardingReviewComponent,
    SubmittedComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    DialogModule,
    ...primengModules,
    ...materialModules,
    RouterModule.forChild(routes),
    TranslateModule.forRoot({}),
    EffectsModule.forFeature([OnboardingEffects]),
  ],
  exports: [],
  providers: [OnboardingService],
})
export class OnboardingModule { }