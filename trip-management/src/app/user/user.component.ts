import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DialogViewComponent } from '../shared/components/ui/dialog-view/dialog-view.component';
import { PageInfo } from '../shared/model/page-info.model';
import { Pageable } from '../shared/model/pageable.model';
import { AppState } from '../state';
import * as fromChurch from '../state/church';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  public type = 'user';
  public users: any[] = [];
  public pageable: Pageable;
  public pageInfo: PageInfo;
  public filters: any;
  public subscription: Subscription = new Subscription();

  constructor(public dialog: MatDialog, private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.subscribeToFilters();
    this.subscribeToPageInfo();
    this.subscribeToPageable();
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

  public subscribeToChurchs() {
    this.subscription.add(
      this.store$
        .pipe(select(fromChurch.selectors.selectChurchs))
        .subscribe((state) => {
          this.users = state;
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

  public selectUser(user: any) {
    this.store$.dispatch(new fromChurch.actions.SelectChurch(user));
    this.dialog.open(DialogViewComponent, {
      width: '1100px',
      data: {
        typeOfData: 'user',
      },
    });
  }

  public edit(user: any) {
    this.store$.dispatch(new fromChurch.actions.SelectChurch(user));
    this.dialog.open(EditUserComponent, {
      width: '900px',
    });
  }
  public delete(user: any) {
    this.store$.dispatch(new fromChurch.actions.SelectChurch(user));
    this.dialog.open(DeleteUserComponent, {
      width: '450px',
    });
  }
}
