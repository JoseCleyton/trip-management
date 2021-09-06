import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogViewComponent } from '../shared/components/ui/dialog-view/dialog-view.component';
import * as fromChurch from '../state/church';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../state';
import { Church } from '../shared/model/church.model';
import { DeleteChurchComponent } from './delete-church/delete-church.component';
import { EditChurchComponent } from './edit-church/edit-church.component';
import { Pageable } from '../shared/model/pageable.model';
import { PageInfo } from '../shared/model/page-info.model';
import { ChangePasswordComponent } from '../shared/components/ui/change-password/change-password.component';
@Component({
  selector: 'app-church',
  templateUrl: './church.component.html',
  styleUrls: ['./church.component.scss'],
})
export class ChurchComponent implements OnInit, OnDestroy {
  public type = 'church';

  public buttonsView = [
    { function: 'Fechar', type: 'basic', justify: 'center' },
  ];

  public formAddChurch: FormGroup;
  public formFilter: FormGroup;

  public churchs: Church[] = [];
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

  public selectChurch(church: Church) {
    this.store$.dispatch(new fromChurch.actions.SelectChurch(church));
    this.dialog.open(DialogViewComponent, {
      width: '1100px',
      data: {
        typeOfData: 'church',
      },
    });
  }

  public preventDefault(event: Event) {
    event.stopPropagation();
  }

  public edit(church: any) {
    this.store$.dispatch(new fromChurch.actions.SelectChurch(church));
    this.dialog.open(EditChurchComponent, {
      width: '900px',
    });
  }
  public delete(church: Church) {
    this.store$.dispatch(new fromChurch.actions.SelectChurch(church));
    this.dialog.open(DeleteChurchComponent, {
      width: '450px',
    });
  }

  public subscribeToChurchs() {
    this.subscription.add(
      this.store$
        .pipe(select(fromChurch.selectors.selectChurchs))
        .subscribe((state) => {
          this.churchs = state;
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

  public searchByNameChurch(nameChurch: string) {
    this.store$.dispatch(
      new fromChurch.actions.ListChurchs(
        {
          name: nameChurch,
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

  public changePassword(church: Church) {
    this.store$.dispatch(new fromChurch.actions.SelectChurch(church));
    this.dialog.open(ChangePasswordComponent, {
      width: '600px',
      data: {
        type: 'church',
      },
    });
  }
}
