import { CustomerServiceFirebaseService } from './../shared/service/customer-service/customer-service-firebase';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { DialogViewComponent } from '../shared/components/ui/dialog-view/dialog-view.component';
import { select, Store } from '@ngrx/store';
import { AppState } from '../state';
import * as fromCustomerService from '../state/customer-service';
import { Subscription } from 'rxjs';
import { Pageable } from '../shared/model/pageable.model';
import { PageInfo } from '../shared/model/page-info.model';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { EditCustomerServiceComponent } from './edit-customer-service/edit-customer-service.component';
import { DeleteComponent } from '../shared/components/ui/delete/delete.component';
@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.scss'],
})
export class CustomerServiceComponent implements OnInit, OnDestroy {
  public customersService: any[] = [];
  public selectedCustomersService = [];
  public type = 'customer-service';

  public buttonsView = [
    { function: 'Fechar', type: 'basic', justify: 'center' },
  ];

  public formFilter: FormGroup;
  public subscription: Subscription = new Subscription();
  public pageable: Pageable;
  public pageInfo: PageInfo;
  public filters: any;

  public selectAllCheckBox = false;

  @ViewChildren('checkBox') public checkBox: any;
  @ViewChild('checkBoxAll', { static: false }) public checkBoxAll: any;

  constructor(
    public dialog: MatDialog,
    private store$: Store<AppState>,
    private customerService: CustomerServiceFirebaseService
  ) {}

  ngOnInit(): void {
    this.subscribeToFilters();
    this.subscribeToPageInfo();
    this.subscribeToPageable();
    this.subscribeToCustomerServices();

    this.store$.dispatch(
      new fromCustomerService.actions.ListCustomerServices(
        this.filters,
        this.pageable
      )
    );

    this.formFilter = new FormGroup({
      nameFilter: new FormControl(null),
      monthBirthDateFilter: new FormControl(null),
      districtFilter: new FormControl(null),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public selectCustomerService(customerService: any): void {
    this.dialog.open(DialogViewComponent, {
      width: '1100px',
      data: {
        typeOfData: 'customer-service',
        data: customerService,
      },
    });
  }

  public preventDefault(event: Event): void {
    event.stopPropagation();
  }

  public edit(christian: any): void {
    this.store$.dispatch(
      new fromCustomerService.actions.SelectCustomerService(christian)
    );
    this.dialog.open(EditCustomerServiceComponent, {
      width: '700px',
    });
  }

  public delete(customerService: any): void {
    this.store$.dispatch(
      new fromCustomerService.actions.SelectCustomerService(customerService)
    );
    this.dialog.open(DeleteComponent, {
      width: '400px',
      data: {
        name: customerService.name,
      },
    });
  }

  public subscribeToCustomerServices(): void {
    this.subscription.add(
      this.store$
        .pipe(select(fromCustomerService.selectors.selectCustomersServices))
        .subscribe((state) => {
          this.customersService = state;
        })
    );
  }

  public subscribeToPageable(): void {
    this.subscription.add(
      this.store$
        .pipe(select(fromCustomerService.selectors.selectPageable))
        .subscribe((state) => {
          this.pageable = { ...state };
        })
    );
  }

  public subscribeToPageInfo(): void {
    this.subscription.add(
      this.store$
        .pipe(select(fromCustomerService.selectors.selectPageInfo))
        .subscribe((state) => {
          this.pageInfo = { ...state };
        })
    );
  }

  public subscribeToFilters(): void {
    this.subscription.add(
      this.store$
        .pipe(select(fromCustomerService.selectors.selectFilters))
        .subscribe((state) => {
          this.filters = { ...state };
        })
    );
  }

  public loadPage(page: number): void {
    this.store$.dispatch(
      new fromCustomerService.actions.ListCustomerServices(this.filters, {
        direction: this.pageable.direction,
        size: this.pageable.size,
        sort: this.pageable.sort,
        page,
      })
    );
  }

  public searchByNameany(nameany: string): void {
    this.store$.dispatch(
      new fromCustomerService.actions.ListCustomerServices(
        {
          name: nameany,
          monthOfBirthday: this.filters.monthOfBirthday,
        },
        {
          direction: this.pageable.direction,
          size: this.pageable.size,
          sort: this.pageable.sort,
          page: this.pageable.page,
        }
      )
    );
  }

  public searchByNumberCustomerService(numberCustomerService: string): void {
    this.store$.dispatch(
      new fromCustomerService.actions.FindByIdCustomerServices(
        numberCustomerService
      )
    );
  }

  public searchByMonthBirthday(month: string): void {
    this.store$.dispatch(
      new fromCustomerService.actions.ListCustomerServices(
        {
          name: this.filters.name,
          monthOfBirthday: month,
        },
        {
          direction: this.pageable.direction,
          size: this.pageable.size,
          sort: this.pageable.sort,
          page: this.pageable.page,
        }
      )
    );
  }

  public resetSearch(): void {
    this.store$.dispatch(
      new fromCustomerService.actions.ListCustomerServices(
        {
          name: '',
          monthOfBirthday: this.filters.monthOfBirthday,
        },
        {
          direction: this.pageable.direction,
          size: this.pageable.size,
          sort: this.pageable.sort,
          page: this.pageable.page,
        }
      )
    );
  }

  public selectAll(completed: boolean): void {
    if (completed) {
      this.selectAllCheckBox = true;
      this.checkBox._results.forEach((element) => {
        element._checked = true;
      });
      this.selectedCustomersService = [...this.customersService];
    } else {
      this.selectAllCheckBox = false;
      this.selectedCustomersService = [];
      this.checkBox._results.forEach((element) => {
        element._checked = false;
      });
    }
  }

  public select(christian: any): void {
    const c = this.selectedCustomersService.find(
      (element) => element.id === christian.id
    );
    if (c) {
      this.selectAllCheckBox = false;
      this.checkBoxAll._checked = false;
      this.selectedCustomersService = this.selectedCustomersService.filter(
        (element) => element.id !== christian.id
      );
    } else {
      this.selectedCustomersService.push(christian);
      this.selectAllCheckBox =
        this.selectedCustomersService.length === this.customersService.length;
      this.checkBoxAll._checked =
        this.selectedCustomersService.length === this.customersService.length;
    }
  }

  // public isInserted(id: number): boolean {
  //   return this.selectedChristians.some((element) => element.id === id);
  // }

  public exportPdf(): void {
    const doc = new jsPDF();
    const col = ['Nome', 'Bairro'];
    const rows = [];
    for (var key in this.selectedCustomersService) {
      let temp = [
        this.selectedCustomersService[key].name,
        this.selectedCustomersService[key].address.district,
      ];
      rows.push(temp);
    }
    doc.autoTable(col, rows, { styles: { fontSize: 20 } });
    doc.save('dizimistas.pdf');
  }

  public selectAllRetrive(): void {
    this.customerService
      .findAll()
      .valueChanges()
      .subscribe((data) => {
        this.selectedCustomersService = [...data];
      });
  }

  searchByNumberChristian(event): void {}
  searchByNameChristian(event): void {}
}
