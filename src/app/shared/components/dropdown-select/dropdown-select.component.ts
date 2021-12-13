import { ISimpleItem } from './../../generics/generic.model';
import { GenericControl } from './../../generics/generic-control';
import { Component } from '@angular/core';

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
