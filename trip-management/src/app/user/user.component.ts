import { DeleteComponent } from './../shared/components/ui/delete/delete.component';
import { User } from 'src/app/shared/model/user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DialogViewComponent } from '../shared/components/ui/dialog-view/dialog-view.component';
import { PageInfo } from '../shared/model/page-info.model';
import { Pageable } from '../shared/model/pageable.model';
import { AppState } from '../state';
import * as fromUser from '../state/user';
import { EditUserComponent } from './edit-user/edit-user.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  public type = 'user';
  public users: User[];
  public pageable: Pageable;
  public pageInfo: PageInfo;

  public formAddChurch: FormGroup;
  public formFilter: FormGroup;

  public filters: any;
  public subscription: Subscription = new Subscription();

  constructor(public dialog: MatDialog, private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.subscribeToFilters();
    this.subscribeToPageInfo();
    this.subscribeToPageable();
    this.createForms();
    this.store$.dispatch(
      new fromUser.actions.ListUsers(
        {
          name: this.filters.name,
        },
        this.pageable
      )
    );
    this.subscribeToUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public searchByNameUser(nameUser: string) {
    this.store$.dispatch(
      new fromUser.actions.ListUsers(
        {
          name: nameUser,
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
      new fromUser.actions.ListUsers(
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

  public subscribeToUsers() {
    this.subscription.add(
      this.store$
        .pipe(select(fromUser.selectors.selectUsers))
        .subscribe((state) => {
          this.users = state;
        })
    );
  }

  public subscribeToPageable() {
    this.subscription.add(
      this.store$
        .pipe(select(fromUser.selectors.selectPageable))
        .subscribe((state) => {
          this.pageable = { ...state };
        })
    );
  }

  public subscribeToPageInfo() {
    this.subscription.add(
      this.store$
        .pipe(select(fromUser.selectors.selectPageInfo))
        .subscribe((state) => {
          this.pageInfo = { ...state };
        })
    );
  }

  public subscribeToFilters() {
    this.subscription.add(
      this.store$
        .pipe(select(fromUser.selectors.selectFilters))
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
      new fromUser.actions.ListUsers(
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
    this.dialog.open(DialogViewComponent, {
      width: '1100px',
      data: {
        typeOfData: 'user',
        data: user,
      },
    });
  }

  public edit(user: any) {
    this.store$.dispatch(new fromUser.actions.SelectUser(user));
    this.dialog.open(EditUserComponent, {
      width: '900px',
    });
  }

  public delete(user: User) {
    this.dialog
      .open(DeleteComponent, {
        width: '450px',
        data: {
          name: user.name,
        },
      })
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.store$.dispatch(new fromUser.actions.DeleteUser(user.id));
        }
      });
  }
}
