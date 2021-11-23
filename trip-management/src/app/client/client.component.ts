import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DeleteComponent } from '../shared/components/ui/delete/delete.component';
import { DialogViewComponent } from '../shared/components/ui/dialog-view/dialog-view.component';
import { Client } from '../shared/model/client.model';
import { PageInfo } from '../shared/model/page-info.model';
import { Pageable } from '../shared/model/pageable.model';
import { AppState } from '../state';
import * as fromClient from '../state/client';
import { EditClientComponent } from './edit-client/edit-client.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit, OnDestroy {
  public type = 'client';
  public formAddChurch: FormGroup;
  public formFilter: FormGroup;

  public clients: Client[] = [];
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
      new fromClient.actions.ListClients(
        {
          name: this.filters.name,
        },
        this.pageable
      )
    );
    this.subscribeToClients();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public selectClient(client: any) {
    this.store$.dispatch(new fromClient.actions.SelectClient(client));
    this.dialog.open(DialogViewComponent, {
      width: '1100px',
      data: {
        typeOfData: 'client',
      },
    });
  }

  public edit(client: any) {
    this.store$.dispatch(new fromClient.actions.SelectClient(client));
    this.dialog.open(EditClientComponent, {
      width: '900px',
    });
  }
  public delete(client: Client) {
    this.store$.dispatch(new fromClient.actions.SelectClient(client));
    this.dialog.open(DeleteComponent, {
      width: '450px',
      data: {
        name: client.name,
      },
    });
  }

  public subscribeToClients() {
    this.subscription.add(
      this.store$
        .pipe(select(fromClient.selectors.selectClients))
        .subscribe((state) => {
          this.clients = state;
        })
    );
  }

  public subscribeToPageable() {
    this.subscription.add(
      this.store$
        .pipe(select(fromClient.selectors.selectPageable))
        .subscribe((state) => {
          this.pageable = { ...state };
        })
    );
  }

  public subscribeToPageInfo() {
    this.subscription.add(
      this.store$
        .pipe(select(fromClient.selectors.selectPageInfo))
        .subscribe((state) => {
          this.pageInfo = { ...state };
        })
    );
  }

  public subscribeToFilters() {
    this.subscription.add(
      this.store$
        .pipe(select(fromClient.selectors.selectFilters))
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
      new fromClient.actions.ListClients(
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

  public searchByNameClient(nameClient: string) {
    this.store$.dispatch(
      new fromClient.actions.ListClients(
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
      new fromClient.actions.ListClients(
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
