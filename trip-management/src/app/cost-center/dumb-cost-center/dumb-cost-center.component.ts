import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dumb-cost-center',
  templateUrl: './dumb-cost-center.component.html',
  styleUrls: ['./dumb-cost-center.component.scss'],
})
export class DumbCostCenterComponent implements OnInit {
  @Input() public costsCenter: any[];

  @Output() selectCostCenterEvent: EventEmitter<any> = new EventEmitter();
  @Output() editCostCenterEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteCostCenterEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public selectCostCenter(costCenter: any) {
    this.selectCostCenterEvent.emit(costCenter);
  }

  public preventDefault(event: Event) {
    event.stopPropagation();
  }

  public edit(costCenter: any) {
    this.editCostCenterEvent.emit(costCenter);
  }
  public delete(costCenter: any) {
    this.deleteCostCenterEvent.emit(costCenter);
  }
}
