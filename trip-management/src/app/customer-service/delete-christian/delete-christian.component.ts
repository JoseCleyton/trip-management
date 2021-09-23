import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Christian } from 'src/app/shared/model/christian.model';
import { AppState } from 'src/app/state';
import * as fromChristian from '../../state/christian';

@Component({
  selector: 'app-delete-christian',
  templateUrl: './delete-christian.component.html',
  styleUrls: ['./delete-christian.component.scss'],
})
export class DeleteChristianComponent implements OnInit, OnDestroy {
  public subscription: Subscription = new Subscription();
  public selectedChristian: Christian;

  constructor(
    private store$: Store<AppState>,
    public dialogRef: MatDialogRef<DeleteChristianComponent>
  ) {}

  ngOnInit(): void {
    this.subscribeToSelectChristian();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public subscribeToSelectChristian() {
    this.subscription.add(
      this.store$
        .pipe(select(fromChristian.selectors.selectSelectedChristian))
        .subscribe((state) => {
          this.selectedChristian = state;
        })
    );
  }

  public delete() {
    this.store$.dispatch(
      new fromChristian.actions.DeleteChristian(this.selectedChristian.id)
    );
    this.closeDialog();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
