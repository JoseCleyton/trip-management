import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-adm-dumb',
  templateUrl: './dashboard-adm-dumb.component.html',
  styleUrls: ['./dashboard-adm-dumb.component.scss'],
})
export class DashboardAdmDumbComponent implements OnInit {
  @Input() public quantityCustomerServicesOpen: number;
  @Input() public quantityCustomerServicesClose: number;
  @Input() public quantityClients: number;

  @Input() public lineChartDataPolarArea;
  @Input() public lineChartLabelsPolarArea;
  @Input() public lineChartColorsPolarArea;
  @Input() public lineChartLegendPolarArea;
  @Input() public lineChartTypePolarArea;

  @Input() public lineChartDataBar;
  @Input() public lineChartLabelsBar;
  @Input() public lineChartColorsBar;
  @Input() public lineChartLegendBar;
  @Input() public lineChartTypeBar;

  constructor() {}

  ngOnInit(): void {}
}
