import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Christian } from 'src/app/shared/model/christian.model';
import { Tithing } from 'src/app/shared/model/tithing.model';
import { AppState } from 'src/app/state';
import * as fromChristian from '../../state/christian';
import * as fromTithing from '../../state/tithing';
@Component({
  selector: 'app-pay-tithing',
  templateUrl: './pay-tithing.component.html',
  styleUrls: ['./pay-tithing.component.scss'],
})
export class PayTithingComponent implements OnInit, OnDestroy {
  public title = 'Pagar Dízimo';
  public formTither: FormGroup;
  public selectedChristian: Christian;
  public subscription: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<PayTithingComponent>,
    private store$: Store<AppState>
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
          if (this.selectedChristian) {
            this.createForm();
          }
        })
    );
  }

  private createForm() {
    this.formTither = new FormGroup({
      christian: new FormControl(
        { value: this.selectedChristian.name, disabled: true },
        [Validators.required]
      ),
      value: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
  }

  public payTithing() {
    const tithing: Tithing = {
      christian: this.selectedChristian,
      value: this.formTither.get('value').value,
    };

    this.store$.dispatch(new fromTithing.actions.AddTithing(tithing));
    this.formTither.reset();
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
