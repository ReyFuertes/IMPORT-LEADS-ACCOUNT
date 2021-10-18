import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { CheckboxModule } from 'primeng/checkbox';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';

const dialogComponents = [
  AddUserDialogComponent
];

const materialModules = [
  MatButtonModule,
  MatDialogModule,
  MatListModule,
  MatCheckboxModule,
  DragDropModule,
  MatDividerModule,
  ScrollingModule,
  MatBadgeModule,
  MatDialogModule
];

const primeNgModules = [
  CheckboxModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    ...primeNgModules,
    SharedModule,
    FlexLayoutModule,
  ],
  exports: [...dialogComponents],
  declarations: [...dialogComponents],
  entryComponents: [...dialogComponents],
  providers: [],
})
export class DialogModule { }
