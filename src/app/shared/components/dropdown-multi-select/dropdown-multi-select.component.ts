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
  @Input() public form: FormGroup;
  @Input() public placeHolder: string = '';
  @Input() public searchItem: boolean = false;
  @Input() public options: ISimpleItem[];
  @Input() public controlName: any;
  @Input() public hasBorder: boolean = false;
  @Input() public maxSelectedLabels: number = 2;
  @Output() public valueEmitter = new EventEmitter<any>();

  public dataFilterForm = new FormControl();
  public $filteredData = new ReplaySubject<any>();

  private newDataList: any;

  constructor(public translateService: TranslateService) {
    super();
  }

  ngOnInit() {
    /* when edit mode pass id to display selected item */
    const id: string = this.form.get(this.controlName).value &&
      this.form.get(this.controlName).value.id || null;
    if (id) this.form.get(this.controlName).patchValue(id);

    this.newDataList = this.options && this.options.slice();
    if (this.newDataList) {
      this.$filteredData.next(this.newDataList);
      this.dataFilterForm.valueChanges
        .subscribe(() => {
          this.filterdata();
        });
    };
  }

  private filterdata(): void {
    let search: string = this.dataFilterForm.value;
    if (!search) {
      this.$filteredData.next(this.newDataList);
      return;
    } else {
      search = search.toLowerCase();
    }

    this.$filteredData.next(
      this.newDataList.filter(data => data.label.toLowerCase().indexOf(search) > -1)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.form && changes.form.currentValue) {
      this.form = changes.form.currentValue;
    }
    if (changes && changes.controlName && changes.controlName.currentValue) {
      this.controlName = changes.controlName.currentValue;
    }
  }
}
