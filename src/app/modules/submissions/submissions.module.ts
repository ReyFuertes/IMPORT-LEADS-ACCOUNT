import { NgModule } from '@angular/core';
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
import { MatTableModule } from '@angular/material/table';
import { SubmissionContainerComponent } from './container/submission-container.component';
import { SubmissionsTableComponent } from './components/submission-table/submissions-table.component';
import { BadgeModule } from 'primeng/badge';

const primengModules = [
  InputTextModule,
  CardModule,
  ButtonModule,
  CheckboxModule,
  BadgeModule
];

const materialModules = [
  MatCardModule,
  MatButtonModule,
  MatTableModule
];

const routes: Routes = [{
  path: '',
  component: SubmissionContainerComponent,
  children: [{
    path: 'table',
    component: SubmissionsTableComponent
  }]
}];
@NgModule({
  declarations: [
    SubmissionContainerComponent,
    SubmissionsTableComponent
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
export class SubmissionModule { }