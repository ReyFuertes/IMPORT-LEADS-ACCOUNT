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
import { CompanyInformationComponent } from './components/company-information/company-information.component';
import { UsersInformationComponent } from './components/users-information/users-information.component';
import {MatTableModule} from '@angular/material/table';
import { SubmittedComponent } from './components/submitted/submitted.component';
import { OnboardingContainerComponent } from './container/onboarding-container.component';
import { OnboardingReviewComponent } from './components/onboarding-review/onboarding-review.component';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from '../dialog/dialog.module';

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

const routes: Routes = [
  {
    path: '',
    component: OnboardingContainerComponent,
    children: [{
      path: '',
      component: EmailPasswordComponent
    }, {
      path: 'company-information',
      component: CompanyInformationComponent
    }, {
      path: 'users-information',
      component: UsersInformationComponent
    }, {
      path: 'onboarding-review',
      component: OnboardingReviewComponent
    }, {
      path: 'submitted',
      component: SubmittedComponent
    }]
  }
];
@NgModule({
  declarations: [
    OnboardingContainerComponent,
    EmailPasswordComponent,
    CompanyInformationComponent,
    UsersInformationComponent,
    OnboardingReviewComponent,
    SubmittedComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    DialogModule,
    ...primengModules,
    ...materialModules,
    RouterModule.forChild(routes),
    TranslateModule.forRoot({})
  ],
  exports: [],
  providers: [],
})
export class OnboardingModule { }