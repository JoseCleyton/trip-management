import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { AppState } from '../state';
import * as fromCustomerService from '../state/customer-service';
import * as fromChristian from '../state/christian';
import * as fromTithing from '../state/tithing';
import { Tithing } from '../shared/model/tithing.model';
import { formatDate } from '../shared/utils/utils';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public title = 'Dashboard';
  public isAdmin = false;

  public lineChartDataBar: ChartDataSets[];
  public lineChartLabelsBar: Label[];
  public lineChartColorsBar: Color[];
  public lineChartLegendBar;
  public lineChartTypeBar;

  public lineChartDataPolarArea: ChartDataSets[];
  public lineChartLabelsPolarArea: Label[];
  public lineChartColorsPolarArea: Color[];
  public lineChartLegendPolarArea;
  public lineChartTypePolarArea;

  public quantityCustomerServicesOpen: number;
  public quantityCustomerServicesClose: number;
  public quantityChristian: number;

  public subscription: Subscription = new Subscription();
  public tithings: Tithing[];
  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('isAdmin') === 'A' ? true : false;

    this.dispatchsIsAdmin();
    this.dispatchIsUser();
    this.subscribeToQuantityCustomersService();
    this.subscribeToQuantityChristians();
    this.subscribeToListTithings();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public subscribeToQuantityCustomersService() {
    this.subscription.add(
      this.store$
        .pipe(select(fromCustomerService.selectors.selectCustomersServices))
        .subscribe((state) => {
          this.quantityCustomerServicesOpen = state.filter(
            (customer) => !customer.dateEnd
          ).length;
          this.quantityCustomerServicesClose = state.filter(
            (customer) => customer.dateEnd
          ).length;
        })
    );
  }

  public subscribeToQuantityChristians() {
    this.subscription.add(
      this.store$
        .pipe(select(fromChristian.selectors.selectQuantityChristians))
        .subscribe((state) => {
          this.quantityChristian = state;
        })
    );
  }

  public subscribeToListTithings() {
    this.subscription.add(
      this.store$
        .pipe(select(fromTithing.selectors.selectTithings))
        .subscribe((state) => {
          this.tithings = state;
          if (this.tithings) {
            this.createChartBar();
            this.createChartPolarArea();
          }
        })
    );
  }

  private dispatchsIsAdmin() {
    if (this.isAdmin) {
      this.store$.dispatch(
        new fromCustomerService.actions.ListCustomerServices(null, null)
      );
    }
  }

  private dispatchIsUser() {
    this.store$.dispatch(new fromChristian.actions.GetQuantityChristians());
    this.store$.dispatch(new fromTithing.actions.GetTotal());
    this.store$.dispatch(new fromTithing.actions.FetchLatestRecords());
  }

  private createChartBar() {
    const dates = this.tithings.map((tithing) => tithing.date);

    const datesFiltering = dates.filter(
      (tithing, index) => dates.indexOf(tithing) === index
    );
    let dataValue = [];
    for (let i = 0; i < datesFiltering.length; i++) {
      const date = datesFiltering[i];
      let value = 0;
      for (let j = 0; j < this.tithings.length; j++) {
        const tithing = this.tithings[j];
        if (date === tithing.date) {
          value += tithing.value;
        }
      }
      dataValue.push(value);
    }

    this.lineChartDataBar = [
      {
        data: dataValue,
        label: 'Chamados Atendidos por Dia',
      },
    ];

    this.lineChartLabelsBar = datesFiltering.map((date) => formatDate(date));

    this.lineChartColorsBar = [
      {
        borderColor: 'white',
        backgroundColor: [
          'rgba(53, 121, 255)',
          'rgb(249, 141, 180)',
          'rgb(146, 207, 226',
          'rgb(121, 17, 74)',
          'rgb(249, 255, 147)',
          'rgb(255, 153, 255)',
        ],
      },
    ];

    this.lineChartLegendBar = 'true';

    this.lineChartTypeBar = 'bar';
  }

  private createChartPolarArea() {
    const dates = this.tithings.map((tithing) => tithing.date);

    const datesFiltering = dates.filter(
      (tithing, index) => dates.indexOf(tithing) === index
    );
    let dataValue = [];
    for (let i = 0; i < datesFiltering.length; i++) {
      const date = datesFiltering[i];
      let value = 0;
      for (let j = 0; j < this.tithings.length; j++) {
        const tithing = this.tithings[j];
        if (date === tithing.date) {
          value += tithing.value;
        }
      }
      dataValue.push(value);
    }

    this.lineChartDataPolarArea = [
      {
        data: dataValue,
        label: 'Chamados Atendidos por Dia',
      },
    ];

    this.lineChartLabelsPolarArea = datesFiltering.map((date) =>
      formatDate(date)
    );

    this.lineChartColorsPolarArea = [
      {
        borderColor: 'white',
        backgroundColor: [
          'rgb(121, 17, 74)',
          'rgb(249, 255, 147)',
          'rgb(255, 153, 255)',
          'rgba(53, 121, 255)',
          'rgb(249, 141, 180)',
          'rgb(146, 207, 226',
        ],
      },
    ];

    this.lineChartLegendPolarArea = 'true';

    this.lineChartTypePolarArea = 'polarArea';
  }
}
