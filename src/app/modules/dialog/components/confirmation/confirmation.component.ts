import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'il-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})

export class ConfirmationComponent {
  public svgPath: string = environment.svgPath;
  public actionText: any[] = [{
    label: 'DELETE',
    message: 'Are you sure to cancel?'
  }, {
    label: 'REFRESH',
    message: 'Are you sure to refresh, this will remove current changes?'
  }];

  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
