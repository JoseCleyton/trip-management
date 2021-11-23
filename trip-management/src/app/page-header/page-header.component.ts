import { EditCustomerServiceComponent } from '../customer-service/edit-customer-service/edit-customer-service.component';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import * as fromChurch from '../state/church';
import * as fromUser from '../state/user';
import { AppState } from '../state';
import { select, Store } from '@ngrx/store';
import { EditClientComponent } from '../client/edit-client/edit-client.component';
import { EditUserComponent } from '../user/edit-user/edit-user.component';
import { EditCostCenterComponent } from '../cost-center/edit-cost-center/edit-cost-center.component';
import { EditTechnicianComponent } from '../technician/edit-technician/edit-technician.component';
@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit, OnDestroy {
  @Input() type: string;
  @Output() searchNameChurch: EventEmitter<string> = new EventEmitter();

  public searchByNameChurch$: Observable<any> = new Observable();
  public subjectSearchBynameChurch$: Subject<any> = new Subject();

  public searchByNameChristian$: Observable<any> = new Observable();
  public subjectSearchByNameChristian$: Subject<any> = new Subject();

  public searchByNumberChristian$: Observable<any> = new Observable();
  public subjectSearchByNumberChristian$: Subject<any> = new Subject();

  public formFilterUser: FormGroup;

  public formFilterChristian: FormGroup;
  @Output() searchNameChristian: EventEmitter<string> = new EventEmitter();
  @Output() searchNumberChristian: EventEmitter<string> = new EventEmitter();
  @Output() searchMonth: EventEmitter<string> = new EventEmitter();
  @Output() reset: EventEmitter<string> = new EventEmitter();

  public formFilterClient: FormGroup;
  @Output() searchNameClient: EventEmitter<string> = new EventEmitter();

  public formFilterCostCenter: FormGroup;
  @Output() searchNameCostCenter: EventEmitter<string> = new EventEmitter();

  public formFilterTechnician: FormGroup;
  @Output() searchNameTechnician: EventEmitter<string> = new EventEmitter();

  public filtersChristian: any;
  public subscription: Subscription = new Subscription();

  public months = [
    { name: 'Janeiro', value: '01' },
    { name: 'Fevereiro', value: '02' },
    { name: 'Março', value: '03' },
    { name: 'Abril', value: '04' },
    { name: 'Maio', value: '05' },
    { name: 'Junho', value: '06' },
    { name: 'Julho', value: '07' },
    { name: 'Agosto', value: '08' },
    { name: 'Setembro', value: '09' },
    { name: 'Outubro', value: '10' },
    { name: 'Novembro', value: '11' },
    { name: 'Dezembro', value: '12' },
  ];

  constructor(public dialog: MatDialog, private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.createForms();
    this.createSubscriptions();

    this.searchByNameChurch$ = this.subjectSearchBynameChurch$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((name: string) => {
        if (name.trim() === '') {
          return of();
        }
        return of(name);
      })
    );

    this.searchByNameChristian$ = this.subjectSearchByNameChristian$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((name: string) => {
        if (name.trim() === '') {
          return of();
        }
        return of(name);
      })
    );

    this.searchByNumberChristian$ = this.subjectSearchByNumberChristian$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((number: string) => {
        if (number.trim() === '') {
          return of();
        }
        return of(number);
      })
    );

    this.subscription.add(
      this.searchByNameChurch$.subscribe((name) => {
        this.searchNameChurch.emit(name);
      })
    );

    this.subscription.add(
      this.searchByNameChristian$.subscribe((name) => {
        this.searchNameChristian.emit(name);
      })
    );

    this.subscription.add(
      this.searchByNumberChristian$.subscribe((number) => {
        this.searchNumberChristian.emit(number);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public openDialogNewCustomerService() {
    this.dialog.open(EditCustomerServiceComponent, {
      width: '600px',
    });
  }

  public openDialogNewUser() {
    this.dialog.open(EditUserComponent, {
      width: '600px',
    });
  }

  public openDialogNewClient() {
    this.dialog.open(EditClientComponent, {
      width: '600px',
    });
  }

  public openDialogNewCostCenter() {
    this.dialog.open(EditCostCenterComponent, {
      width: '900px',
    });
  }

  public openDialogNewTechnician() {
    this.dialog.open(EditTechnicianComponent, {
      width: '900px',
    });
  }

  public searchByNameChurch(nameChurch: string) {
    this.subjectSearchBynameChurch$.next(nameChurch);
    if (nameChurch.length === 0) {
      this.resetSearch();
    }
  }

  public searchByNameChristian(nameChristian: string) {
    this.subjectSearchByNameChristian$.next(nameChristian);
    if (nameChristian.length === 0) {
      this.resetSearch();
    }
  }

  public searchByNumberChristian(number: string) {
    this.subjectSearchByNumberChristian$.next(number);
    if (number.length === 0) {
      this.resetSearch();
    }
  }

  public searchByMonthBirthday(month: string) {
    if (month) {
      this.searchMonth.emit(month);
    } else if (this.filtersChristian.monthOfBirthday != 0) {
      this.searchMonth.emit('0');
    }
  }

  private createForms() {
    if (this.type === 'user') {
      this.formFilterUser = new FormGroup({
        name: new FormControl(null),
      });
    }

    if (this.type === 'client') {
      this.formFilterClient = new FormGroup({
        name: new FormControl(null),
      });
    }

    if (this.type === 'cost-center') {
      this.formFilterCostCenter = new FormGroup({
        name: new FormControl(null),
      });
    }

    if (this.type === 'technician') {
      this.formFilterTechnician = new FormGroup({
        name: new FormControl(null),
      });
    }

    if (this.type === 'customer-service') {
      this.formFilterChristian = new FormGroup({
        number: new FormControl(null),
        name: new FormControl(null),
        monthOfBirthday: new FormControl(null),
      });
    }
  }

  public createSubscriptions() {
    if (this.type === 'user') {
      this.subscribeToChurchFilters();
    }
    if (this.type === 'client') {
      this.formFilterClient.get('name').setValue('');
    }

    if (this.type === 'cost-center') {
      this.formFilterCostCenter.get('name').setValue('');
    }

    if (this.type === 'technician') {
      this.formFilterTechnician.get('name').setValue('');
    }

    if (this.type === 'customer-service') {
      this.subscribeToChristianFilters();
    }
  }

  public subscribeToChurchFilters() {
    this.subscription.add(
      this.store$
        .pipe(select(fromChurch.selectors.selectFilters))
        .subscribe((state) => {
          if (state) {
            this.formFilterUser.get('name').setValue(state.name);
          }
        })
    );
  }

  public subscribeToChristianFilters() {
    this.subscription.add(
      this.store$
        .pipe(select(fromUser.selectors.selectFilters))
        .subscribe((state) => {
          if (state) {
            this.filtersChristian = { ...state };
            this.formFilterChristian.get('name').setValue(state.name);
            this.formFilterChristian
              .get('monthOfBirthday')
              .setValue(state.monthOfBirthday);
            this.formFilterChristian.get('number').setValue(state.id);
          }
        })
    );
  }

  public resetSearch() {
    this.reset.emit('reset');
  }
}
