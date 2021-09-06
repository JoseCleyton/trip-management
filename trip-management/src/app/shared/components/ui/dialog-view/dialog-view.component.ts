import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import * as fromChristian from '../../../../state/christian';
import * as fromChurch from '../../../../state/church';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/state';
@Component({
  selector: 'app-dialog-view',
  templateUrl: './dialog-view.component.html',
  styleUrls: ['./dialog-view.component.scss'],
})
export class DialogViewComponent implements OnInit, OnDestroy {
  public typeOfData: string;
  public data: any;
  public selectedItem: any;
  public subscription: Subscription = new Subscription();
  constructor(
    public dialogRef: MatDialogRef<DialogViewComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.typeOfData = this.inputData.typeOfData;
    this.createSubscribes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  private createSubscribes() {
    if (this.typeOfData === 'christian') {
      this.subscribeToSelectChristian();
    } else {
      this.subscribeToSelectChurch();
    }
  }

  public subscribeToSelectChurch() {
    this.subscription.add(
      this.store$
        .pipe(select(fromChurch.selectors.selectSelectedChurch))
        .subscribe((state) => {
          this.selectedItem = state;
        })
    );
  }
  
  public subscribeToSelectChristian() {
    this.subscription.add(
      this.store$
        .pipe(select(fromChristian.selectors.selectSelectedChristian))
        .subscribe((state) => {
          this.selectedItem = state;
        })
    );
  }
}
