import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Church } from 'src/app/shared/model/church.model';
import { AppState } from 'src/app/state';
import * as fromChurch from '../../state/church';

@Component({
  selector: 'app-delete-church',
  templateUrl: './delete-church.component.html',
  styleUrls: ['./delete-church.component.scss'],
})
export class DeleteChurchComponent implements OnInit, OnDestroy {
  public subscription: Subscription = new Subscription();
  public selectedChurch: Church;

  constructor(
    public dialogRef: MatDialogRef<DeleteChurchComponent>,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscribeToSelectChurch();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public delete() {
    this.store$.dispatch(
      new fromChurch.actions.DeleteChurch(this.selectedChurch.id)
    );
    this.closeDialog();
  }

  public subscribeToSelectChurch() {
    this.subscription.add(
      this.store$
        .pipe(select(fromChurch.selectors.selectSelectedChurch))
        .subscribe((state) => {
          this.selectedChurch = state;
        })
    );
  }
}
