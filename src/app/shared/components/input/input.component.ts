import { Component } from '@angular/core';
import { GenericControl } from '../../generics/generic-control';
import { ISimpleItem } from '../../generics/generic.model';

@Component({
  selector: 'il-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent extends GenericControl<ISimpleItem> {
  constructor() {
    super();
  }
}
