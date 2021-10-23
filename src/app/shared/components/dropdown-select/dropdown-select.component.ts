import { ISimpleItem } from './../../generics/generic.model';
import { GenericControl } from './../../generics/generic-control';
import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControlName } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'il-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss']
})

export class DropdownSelectComponent extends GenericControl<ISimpleItem> {
  constructor() {
    super();
  }
}
