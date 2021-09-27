import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DialogViewComponent } from '../shared/components/ui/dialog-view/dialog-view.component';
import { PageInfo } from '../shared/model/page-info.model';
import { Pageable } from '../shared/model/pageable.model';
import { AppState } from '../state';
import { DeleteCostCenterComponent } from './delete-cost-center/delete-cost-center.component';
import { EditCostCenterComponent } from './edit-cost-center/edit-cost-center.component';
import * as fromChurch from '../state/church';

@Component({
  selector: 'app-cost-center',
  templateUrl: './cost-center.component.html',
  styleUrls: ['./cost-center.component.scss'],
})
export class CostCenterComponent implements OnInit, OnDestroy {
  public type = 'cost-center';
  public formAddChurch: FormGroup;
  public formFilter: FormGroup;

  public costsCenter: any[] = [];
  public pageable: Pageable;
  public pageInfo: PageInfo;
  public filters: any;
  public subscription: Subscription = new Subscription();

  constructor(public dialog: MatDialog, private store$: Store<AppState>) {}
 
  ngOnInit(): void {
    this.subscribeToFilters();
    this.subscribeToPageInfo();
    this.subscribeToPageable();
    this.createForms();
    this.store$.dispatch(
      new fromChurch.actions.ListChurchs(
        {
          name: this.filters.name,
        },
        this.pageable
      )
    );
    this.subscribeToChurchs();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public selectCostCenter(client: any) {
    this.store$.dispatch(new fromChurch.actions.SelectChurch(client));
    this.dialog.open(DialogViewComponent, {
      width: '1100px',
      data: {
        typeOfData: 'cost-center',
      },
    });
  }

  public edit(client: any) {
    this.store$.dispatch(new fromChurch.actions.SelectChurch(client));
    this.dialog.open(EditCostCenterComponent, {
      width: '900px',
    });
  }

  public delete(client: any) {
    this.store$.dispatch(new fromChurch.actions.SelectChurch(client));
    this.dialog.open(DeleteCostCenterComponent, {
      width: '450px',
    });
  }

  public subscribeToChurchs() {
    this.subscription.add(
      this.store$
        .pipe(select(fromChurch.selectors.selectChurchs))
        .subscribe((state) => {
          this.costsCenter = state;
        })
    );
  }

  public subscribeToPageable() {
    this.subscription.add(
      this.store$
        .pipe(select(fromChurch.selectors.selectPageable))
        .subscribe((state) => {
          this.pageable = { ...state };
        })
    );
  }

  public subscribeToPageInfo() {
    this.subscription.add(
      this.store$
        .pipe(select(fromChurch.selectors.selectPageInfo))
        .subscribe((state) => {
          this.pageInfo = { ...state };
        })
    );
  }

  public subscribeToFilters() {
    this.subscription.add(
      this.store$
        .pipe(select(fromChurch.selectors.selectFilters))
        .subscribe((state) => {
          this.filters = { ...state };
        })
    );
  }

  private createForms() {
    this.formAddChurch = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null),
      email: new FormControl(null),
      district: new FormControl(null, [Validators.required]),
      responsible: new FormControl(null, [Validators.required]),
      login: new FormControl(null, [Validators.required]),
    });

    this.formFilter = new FormGroup({
      nameFilter: new FormControl(null),
      districtFilter: new FormControl(null),
      responsibleFilter: new FormControl(null),
    });
  }

  public loadPage(page: number) {
    this.store$.dispatch(
      new fromChurch.actions.ListChurchs(
        {
          name: this.filters.name,
        },
        {
          direction: this.pageable.direction,
          size: this.pageable.size,
          sort: this.pageable.sort,
          page: page,
        }
      )
    );
  }

  public searchByNameCostCenter(nameClient: string) {
    this.store$.dispatch(
      new fromChurch.actions.ListChurchs(
        {
          name: nameClient,
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

  public resetSearch() {
    this.store$.dispatch(
      new fromChurch.actions.ListChurchs(
        {
          name: '',
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
}
