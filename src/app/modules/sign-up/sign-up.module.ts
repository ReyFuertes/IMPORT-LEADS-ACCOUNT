import { NgModule } from '@angular/core';
import { SignUpContainerComponent } from './container/sign-up-container.component';
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
import { SignUpReviewComponent } from './components/sign-up-review/sign-up-review.component';

const primengModules = [
  InputTextModule,
  CardModule,
  ButtonModule,
  CheckboxModule,
];

const materialModules = [
  MatCardModule,
  MatButtonModule,
  MatTableModule
];

const routes: Routes = [
  {
    path: '',
    component: SignUpContainerComponent,
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
      path: 'sign-up-review',
      component: SignUpReviewComponent
    }]
  }
];
@NgModule({
  declarations: [
    SignUpContainerComponent,
    EmailPasswordComponent,
    CompanyInformationComponent,
    UsersInformationComponent,
    SignUpReviewComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    ...primengModules,
    ...materialModules,
    RouterModule.forChild(routes),
    TranslateModule.forRoot({})
  ],
  exports: [],
  providers: [],
})
export class SignUpModule { }