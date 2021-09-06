import { Label, Color } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as fromTithing from '../state/tithing';
import { select, Store } from '@ngrx/store';
import { AppState } from '../state';
import { Subscription } from 'rxjs';
import { formatDate } from '../shared/utils/utils';
import { Tithing } from '../shared/model/tithing.model';
import { PageInfoDateFilter } from '../shared/model/page-info-date-filter.model';
import { DateAdapter } from '@angular/material/core';
import * as fromChurch from '../state/church';
import { Church } from '../shared/model/church.model';
import { datePipeFormatPipe } from '../shared/pipes/datePipeTransform';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit, OnDestroy {
  public lineChartDataBar: ChartDataSets[];
  public lineChartLabelsBar: Label[];
  public lineChartColorsBar: Color[];
  public lineChartLegendBar;
  public lineChartTypeBar;
  public lineChartPluginsBar;

  public lineChartDataDoughnutPie: ChartDataSets[];
  public lineChartLabelsDoughnutPie: Label[];
  public lineChartColorsDoughnutPie: Color[];
  public lineChartLegendDoughnutPie;
  public lineChartTypeDoughnutPie;
  public lineChartPluginsDoughnutPie;

  public lineChartDataLine: ChartDataSets[];
  public lineChartLabelsLine: Label[];
  public lineChartColorsLine: Color[];
  public lineChartLegendLine;
  public lineChartTypeLine;
  public lineChartPluginsLine;

  public tithes = [];
  public formChurch: FormGroup;
  public formFilter: FormGroup;

  public typesFormFilter = [
    {
      label: 'Nome',
      formControlName: 'nameFilter',
      type: 'input',
      placeholder: 'Ex. João',
      lenghtXl: 4,
      lenghtMd: 12,
      lenghtSm: 12,
    },
    {
      label: 'Data',
      formControlName: 'date',
      type: 'input',
      placeholder: 'Ex. 10/10/2010',
      lenghtXl: 4,
      lenghtMd: 12,
      lenghtSm: 12,
    },
    {
      label: 'Bairro',
      formControlName: 'districtFilter',
      type: 'select',
      select: [
        { value: '1', name: 'Alto da Esperança' },
        { value: '2', name: 'Alto Santa Inês' },
        { value: '3', name: 'Centro' },
      ],
      lenghtXl: 4,
      lenghtMd: 12,
      lenghtSm: 12,
    },
  ];
  public buttonsFilter = [
    { function: 'Cancelar', type: 'basic', justify: 'start' },
    { function: 'Aplicar', type: 'primary', justify: 'end' },
  ];

  public titleFilter = 'Filtrar';

  public pageSize = 3;
  public length = 100;
  public pageSizeOptions = [2, 3];

  public churchs: Church[] = [];

  public totalTithings: number;
  public tithings: Tithing[];
  public pageInfo: PageInfoDateFilter;
  public subscription: Subscription = new Subscription();
  public isAdmin = false;

  public formFilterDate: FormGroup;

  constructor(
    private store$: Store<AppState>,
    private dateAdapter: DateAdapter<Date>,
    private datePipe: datePipeFormatPipe
  ) {
    this.dateAdapter.setLocale('pt-BR');
  }
  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('isAdmin') === 'A' ? true : false;

    this.formChurch = new FormGroup({
      church: new FormControl(null, [Validators.required]),
    });

    this.formFilter = new FormGroup({
      nameFilter: new FormControl(null),
      data: new FormControl(null),
      districtFilter: new FormControl(null),
    });

    this.formFilterDate = new FormGroup({
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
    });

    this.createSubscribes();
    this.dispatchs();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private createSubscribes() {
    this.subscribeToPageInfo();
    this.subscribeToListTithings();
    this.subscribeToTotalTithings();
    if (this.isAdmin) {
      this.subscribeToChurchs();
    }
  }

  public subscribeToListTithings() {
    this.subscription.add(
      this.store$
        .pipe(select(fromTithing.selectors.selectTithings))
        .subscribe((state) => {
          this.tithings = state;
          if (this.tithings) {
            this.createChartBar();
            this.createChartDoughnutPie();
            this.createChartLine();
          }
        })
    );
  }
  public subscribeToTotalTithings() {
    this.subscription.add(
      this.store$
        .pipe(select(fromTithing.selectors.selectTotal))
        .subscribe((state) => {
          this.totalTithings = state;
        })
    );
  }
  public subscribeToPageInfo() {
    this.subscription.add(
      this.store$
        .pipe(select(fromTithing.selectors.selectPageInfo))
        .subscribe((state) => {
          this.pageInfo = state;
          this.formFilterDate
            .get('startDate')
            .setValue(
              new Date(
                this.datePipe.transform(this.pageInfo.startDate, 'yyyy/MM/dd')
              )
            );
          this.formFilterDate
            .get('endDate')
            .setValue(
              new Date(
                this.datePipe.transform(this.pageInfo.endDate, 'yyyy/MM/dd')
              )
            );
        })
    );
  }
  public subscribeToChurchs() {
    this.subscription.add(
      this.store$
        .pipe(select(fromChurch.selectors.selectChurchs))
        .subscribe((state) => {
          this.churchs = [...state];
          if (this.churchs.length > 0) {
            const church = this.churchs.find((church) => church.user.admin);
            this.formChurch.get('church').setValue(church ? church.id : 1);
            this.dispatchTithings();
          }
        })
    );
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
        label: 'Dízimos Por dia',
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

  private createChartDoughnutPie() {
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

    this.lineChartDataDoughnutPie = [
      {
        data: dataValue,
        label: 'Dízimos Por dia',
      },
    ];

    this.lineChartLabelsDoughnutPie = datesFiltering.map((date) =>
      formatDate(date)
    );

    this.lineChartColorsDoughnutPie = [
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

    this.lineChartLegendDoughnutPie = 'true';
    this.lineChartTypeDoughnutPie = 'doughnut';
  }

  private createChartLine() {
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

    this.lineChartDataLine = [
      {
        data: dataValue,
        label: 'Dízimos Por dia',
      },
    ];

    this.lineChartLabelsLine = datesFiltering.map((date) => formatDate(date));

    this.lineChartColorsLine = [
      {
        borderColor: 'white',
        backgroundColor: 'rgba(146, 207, 226)',
      },
    ];

    this.lineChartLegendLine = 'true';
    this.lineChartTypeLine = 'line';
  }

  private dispatchs() {
    if (this.isAdmin) {
      this.store$.dispatch(new fromChurch.actions.ListAllChurchs());
      this.store$.dispatch(new fromTithing.actions.RetrieveTotal());
    }else{
      this.store$.dispatch(new fromTithing.actions.GetTotal());
    }
  }

  public searchByDate() {
    if (this.isAdmin) {
      this.store$.dispatch(
        new fromTithing.actions.ListTithingsAdm(
          this.formChurch.get('church').value,
          this.datePipe.transform(
            this.formFilterDate.get('startDate').value,
            'yyyy-MM-dd'
          ),
          this.datePipe.transform(
            this.formFilterDate.get('endDate').value,
            'yyyy-MM-dd'
          )
        )
      );
    } else {
      this.store$.dispatch(
        new fromTithing.actions.ListTithings(
          this.datePipe.transform(
            this.formFilterDate.get('startDate').value,
            'yyyy-MM-dd'
          ),
          this.datePipe.transform(
            this.formFilterDate.get('endDate').value,
            'yyyy-MM-dd'
          )
        )
      );
    }
  }
  private dispatchTithings() {
    if (this.isAdmin) {
      this.store$.dispatch(
        new fromTithing.actions.ListTithingsAdm(
          this.formChurch.get('church').value,
          this.datePipe.transform(this.pageInfo.startDate, 'yyyy-MM-dd'),
          this.datePipe.transform(this.pageInfo.endDate, 'yyyy-MM-dd')
        )
      );
    } else {
      this.store$.dispatch(
        new fromTithing.actions.ListTithings(
          this.datePipe.transform(this.pageInfo.startDate, 'yyyy-MM-dd'),
          this.datePipe.transform(this.pageInfo.endDate, 'yyyy-MM-dd')
        )
      );
    }
  }

  public changeChurch() {
    this.store$.dispatch(
      new fromTithing.actions.ListTithingsAdm(
        this.formChurch.get('church').value,
        this.datePipe.transform(this.pageInfo.startDate, 'yyyy-MM-dd'),
        this.datePipe.transform(this.pageInfo.endDate, 'yyyy-MM-dd')
      )
    );
    this.store$.dispatch(
      new fromTithing.actions.GetTotalByChurch(
        this.formChurch.get('church').value
      )
    );
  }
}
