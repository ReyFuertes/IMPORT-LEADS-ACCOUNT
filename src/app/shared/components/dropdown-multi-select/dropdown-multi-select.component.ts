import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import * as _ from 'lodash';
import { GenericControl } from '../../generics/generic-control';
import { ISimpleItem } from '../../generics/generic.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'il-dropdown-multi-select',
  templateUrl: './dropdown-multi-select.component.html',
  styleUrls: ['./dropdown-multi-select.component.scss']
})
export class DropdownMultiSelectComponent extends GenericControl<ISimpleItem> implements OnInit, OnChanges {
  @Input() public searchItem: boolean = false;
  @Input() public maxSelectedLabels: number = 2;
  @Output() public valueEmitter = new EventEmitter<any>();

  constructor(public translateService: TranslateService) {
    super();
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.form && changes.form.currentValue) {
      this.form = changes.form.currentValue;
    }
    if (changes && changes.controlName && changes.controlName.currentValue) {
      this.controlName = changes.controlName.currentValue;
    }
  }
}
