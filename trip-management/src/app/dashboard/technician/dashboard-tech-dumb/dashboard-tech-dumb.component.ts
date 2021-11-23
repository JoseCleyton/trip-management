import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-tech-dumb',
  templateUrl: './dashboard-tech-dumb.component.html',
  styleUrls: ['./dashboard-tech-dumb.component.scss'],
})
export class DashboardTechDumbComponent implements OnInit {
  @Input() public myCustomersServices: number;
  @Input() public myQuantityCustomerServicesClose: number;
  constructor() {}

  ngOnInit(): void {}
}
