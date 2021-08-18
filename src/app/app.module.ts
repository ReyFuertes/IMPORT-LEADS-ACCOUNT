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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    SharedModule,
    FlexLayoutModule,
    ...materialModules,
    // ...primeNgModules,
    AppRoutingModule,
    TranslateModule.forRoot({})
  ],
  providers: [...directives],
  bootstrap: [AppComponent]
})
export class AppModule { }
