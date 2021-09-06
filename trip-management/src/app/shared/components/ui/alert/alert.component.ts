import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/state';
import * as fromAlert from '../../../../state/alert';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  public alerts = [];
  public subscription: Subscription = new Subscription();

  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.subscribeToAlerts();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public subscribeToAlerts() {
    this.subscription.add(
      this.store$
        .pipe(select(fromAlert.selectors.selectAlerts))
        .subscribe((state) => {
          this.alerts = state;
        })
    );
  }

  public closeAlertError(id: number) {
    this.store$.dispatch(new fromAlert.actions.RemoveAlert(id));
  }
}
