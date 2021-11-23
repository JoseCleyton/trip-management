import { CustomerService } from 'src/app/shared/model/customer-service.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { AppState } from '../state';
import * as fromCustomerService from '../state/customer-service';
import * as fromClient from '../state/client';
import { formatDate } from '../shared/utils/utils';

interface Profile {
  description: string;
  id: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public title = 'Dashboard';
  public isAdmin = false;
  public profile: Profile;

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

  public quantityClients: number;

  public subscription: Subscription = new Subscription();
  public customersService: CustomerService[];

  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    // this.isAdmin = localStorage.getItem('isAdmin') === 'A' ? true : false;
    this.profile = JSON.parse(localStorage.getItem('profile'));
    this.chooseDispatchs();
    this.subscribeToQuantityCustomersService();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private chooseDispatchs(): void {
    if (this.profile.id === '1') {
      this.dispatchsIsAdmin();
      this.getClients();
      this.subscribeToQuantityClients();
    }
    if (this.profile.id === '3') {
      this.dispatchIsTechnician();
    }
  }

  private getClients(): void {
    this.store$.dispatch(new fromClient.actions.ListClients(null, null));
  }

  public subscribeToQuantityClients(): void {
    this.subscription.add(
      this.store$
        .pipe(select(fromClient.selectors.selectClients))
        .subscribe((state) => {
          this.quantityClients = state.length;
        })
    );
  }

  public subscribeToQuantityCustomersService(): void {
    this.subscription.add(
      this.store$
        .pipe(select(fromCustomerService.selectors.selectCustomersServices))
        .subscribe((state) => {
          this.customersService = [...state];
          this.quantityCustomerServicesOpen = state.filter(
            (customer) => !customer.dateEnd
          ).length;
          this.quantityCustomerServicesClose = state.filter(
            (customer) => customer.dateEnd
          ).length;
          if (state) {
            this.createChartBar();
            this.createChartPolarArea();
          }
        })
    );
  }

  private dispatchsIsAdmin(): void {
    this.store$.dispatch(
      new fromCustomerService.actions.ListCustomerServices(null, null)
    );
  }

  private dispatchIsTechnician(): void {
    // Obter os chamados atribuidos ao técnico
  }

  private createChartBar(): void {
    const dates = this.customersService.map(
      (customerService) => customerService.dateStart
    );

    const datesFiltering = dates.filter(
      (tithing, index) => dates.indexOf(tithing) === index
    );

    let dataValue = [];
    for (let i = 0; i < datesFiltering.length; i++) {
      const date = datesFiltering[i];
      let value = 0;
      for (let j = 0; j < this.customersService.length; j++) {
        const customerService = this.customersService[j];
        if (date === customerService.dateStart) {
          ++value;
        }
      }
      dataValue.push(value);
    }

    this.lineChartDataBar = [
      {
        data: dataValue,
        label: 'Chamados abertos por Dia',
      },
    ];

    this.lineChartLabelsBar = datesFiltering;

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
    const dates = this.customersService.map(
      (customerService) => customerService.dateStart
    );

    const datesFiltering = dates.filter(
      (tithing, index) => dates.indexOf(tithing) === index
    );
    let dataValue = [];
    for (let i = 0; i < datesFiltering.length; i++) {
      const date = datesFiltering[i];
      let value = 0;
      for (let j = 0; j < this.customersService.length; j++) {
        const customerService = this.customersService[j];
        if (date === customerService.dateStart) {
          ++value;
        }
      }
      dataValue.push(value);
    }

    this.lineChartDataPolarArea = [
      {
        data: dataValue,
        label: 'Chamados abertos por Dia',
      },
    ];

    this.lineChartLabelsPolarArea = datesFiltering;

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
