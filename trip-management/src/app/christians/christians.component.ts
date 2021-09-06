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
import { PayTithingComponent } from './pay-tithing/pay-tithing.component';
import { select, Store } from '@ngrx/store';
import { AppState } from '../state';
import * as fromChristian from '../state/christian';
import { Subscription } from 'rxjs';
import { Christian } from '../shared/model/christian.model';
import { EditChristianComponent } from './edit-christian/edit-christian.component';
import { DeleteChristianComponent } from './delete-christian/delete-christian.component';
import { Pageable } from '../shared/model/pageable.model';
import { PageInfo } from '../shared/model/page-info.model';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ChristianService } from '../shared/service/christian/christian.service';
@Component({
  selector: 'app-christians',
  templateUrl: './christians.component.html',
  styleUrls: ['./christians.component.scss'],
})
export class ChristiansComponent implements OnInit, OnDestroy {
  public christians: Christian[] = [];
  public type = 'christian';

  public buttonsView = [
    { function: 'Fechar', type: 'basic', justify: 'center' },
  ];

  public formAddCristian: FormGroup;
  public formFilter: FormGroup;
  public subscription: Subscription = new Subscription();
  public pageable: Pageable;
  public pageInfo: PageInfo;
  public filters: any;
  public selectedChristians: Christian[] = [];

  public selectAllCheckBox = false;

  @ViewChildren('checkBox') public checkBox: any;
  @ViewChild('checkBoxAll', { static: false }) public checkBoxAll: any;

  constructor(
    public dialog: MatDialog,
    private store$: Store<AppState>,
    private christianService: ChristianService
  ) {}

  ngOnInit(): void {
    this.subscribeToFilters();
    this.subscribeToPageInfo();
    this.subscribeToPageable();
    this.subscribeToChristians();

    this.store$.dispatch(
      new fromChristian.actions.ListChristians(this.filters, this.pageable)
    );

    this.formAddCristian = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null),
      email: new FormControl(null),
      birthDate: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
    });

    this.formFilter = new FormGroup({
      nameFilter: new FormControl(null),
      monthBirthDateFilter: new FormControl(null),
      districtFilter: new FormControl(null),
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public selectChristian(christian: Christian) {
    this.store$.dispatch(new fromChristian.actions.SelectChristian(christian));
    this.dialog.open(DialogViewComponent, {
      width: '1100px',
      data: {
        typeOfData: 'christian',
      },
    });
  }

  public preventDefault(event: Event) {
    event.stopPropagation();
  }

  public edit(christian: Christian) {
    this.store$.dispatch(new fromChristian.actions.SelectChristian(christian));
    this.dialog.open(EditChristianComponent, {
      width: '700px',
    });
  }
  public delete(christian: Christian) {
    this.store$.dispatch(new fromChristian.actions.SelectChristian(christian));
    this.dialog.open(DeleteChristianComponent, {
      width: '400px',
    });
  }
  public openModalPayTithing(christian: any) {
    this.store$.dispatch(new fromChristian.actions.SelectChristian(christian));
    this.dialog.open(PayTithingComponent, {
      width: '600px',
    });
  }

  public subscribeToChristians() {
    this.subscription.add(
      this.store$
        .pipe(select(fromChristian.selectors.selectChristians))
        .subscribe((state) => {
          this.christians = state;
        })
    );
  }

  public subscribeToPageable() {
    this.subscription.add(
      this.store$
        .pipe(select(fromChristian.selectors.selectPageable))
        .subscribe((state) => {
          this.pageable = { ...state };
        })
    );
  }

  public subscribeToPageInfo() {
    this.subscription.add(
      this.store$
        .pipe(select(fromChristian.selectors.selectPageInfo))
        .subscribe((state) => {
          this.pageInfo = { ...state };
        })
    );
  }

  public subscribeToFilters() {
    this.subscription.add(
      this.store$
        .pipe(select(fromChristian.selectors.selectFilters))
        .subscribe((state) => {
          this.filters = { ...state };
        })
    );
  }

  public loadPage(page: number) {
    this.store$.dispatch(
      new fromChristian.actions.ListChristians(this.filters, {
        direction: this.pageable.direction,
        size: this.pageable.size,
        sort: this.pageable.sort,
        page: page,
      })
    );
  }

  public searchByNameChristian(nameChristian: string) {
    this.store$.dispatch(
      new fromChristian.actions.ListChristians(
        {
          name: nameChristian,
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

  public searchByNumberChristian(number: string) {
    this.store$.dispatch(new fromChristian.actions.FindByIdChristians(number));
  }

  public searchByMonthBirthday(month) {
    this.store$.dispatch(
      new fromChristian.actions.ListChristians(
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

  public resetSearch() {
    this.store$.dispatch(
      new fromChristian.actions.ListChristians(
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

  public selectAll(completed: boolean) {
    if (completed) {
      this.selectAllCheckBox = true;
      this.checkBox._results.forEach((element) => {
        element._checked = true;
      });
      this.selectedChristians = [...this.christians];
    } else {
      this.selectAllCheckBox = false;
      this.selectedChristians = [];
      this.checkBox._results.forEach((element) => {
        element._checked = false;
      });
    }
  }

  public select(christian: Christian) {
    const c = this.selectedChristians.find(
      (element) => element.id === christian.id
    );
    if (c) {
      this.selectAllCheckBox = false;
      this.checkBoxAll._checked = false;
      this.selectedChristians = this.selectedChristians.filter(
        (element) => element.id !== christian.id
      );
    } else {
      this.selectedChristians.push(christian);
      this.selectAllCheckBox =
        this.selectedChristians.length === this.christians.length;
      this.checkBoxAll._checked =
        this.selectedChristians.length === this.christians.length;
    }
  }

  public isInserted(id: number): boolean {
    return this.selectedChristians.some((element) => element.id === id);
  }

  public exportPdf() {
    let doc = new jsPDF();
    let col = ['Nome', 'Bairro'];
    let rows = [];
    for (var key in this.selectedChristians) {
      let temp = [
        this.selectedChristians[key].name,
        this.selectedChristians[key].address.district,
      ];
      rows.push(temp);
    }
    doc.autoTable(col, rows, { styles: { fontSize: 20 } });
    doc.save('dizimistas.pdf');
  }

  public selectAllRetrive() {
    this.christianService.retrieveChristians().subscribe((data) => {
      this.selectedChristians = [...data];
    });
  }
}
