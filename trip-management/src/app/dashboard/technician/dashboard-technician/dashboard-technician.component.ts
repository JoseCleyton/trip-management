import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-technician',
  templateUrl: './dashboard-technician.component.html',
  styleUrls: ['./dashboard-technician.component.scss'],
})
export class DashboardTechnicianComponent implements OnInit {
  public myCustomersServices = 0;
  public myQuantityCustomerServicesClose = 0;
  constructor() {}

  ngOnInit(): void {}
}
