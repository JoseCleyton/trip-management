import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewChildren,
} from '@angular/core';
@Component({
  selector: 'app-dumb-customer',
  templateUrl: './dumb-customer.component.html',
  styleUrls: ['./dumb-customer.component.scss'],
})
export class DumbCustomerComponent implements OnInit {
  @Input() public customersService: any[];
  @Input() public selectedCustomersService: any[] = [];

  @Output() public selectCustomerServiceEvent: EventEmitter<any> =
    new EventEmitter();
  @Output() public editCustomerServiceEvent: EventEmitter<any> =
    new EventEmitter();
  @Output() public deleteCustomerServiceEvent: EventEmitter<any> =
    new EventEmitter();
  @Output() public selectItenEvent: EventEmitter<any> = new EventEmitter();
  @Output() public selectAllRetrieveEvent: EventEmitter<any> =
    new EventEmitter();

  @ViewChildren('checkBox') public checkBox: any;
  @ViewChild('checkBoxAll', { static: false }) public checkBoxAll: any;

  public selectAllCheckBox = false;

  constructor() {}

  ngOnInit(): void {}

  public selectCustomerService(customerService: any) {
    this.selectCustomerServiceEvent.emit(customerService);
  }

  public preventDefault(event: Event) {
    event.stopPropagation();
  }

  public edit(customerService: any) {
    this.editCustomerServiceEvent.emit(customerService);
  }

  public delete(customerService: any) {
    this.deleteCustomerServiceEvent.emit(customerService);
  }

  public selectAll(completed: boolean) {
    if (completed) {
      this.selectAllCheckBox = true;
      this.checkBox._results.forEach((element) => {
        element._checked = true;
      });
      this.selectedCustomersService = [...this.customersService];
    } else {
      this.selectAllCheckBox = false;
      this.selectedCustomersService = [];
      this.checkBox._results.forEach((element) => {
        element._checked = false;
      });
    }
  }

  public selectIten(customerService: any) {
    this.selectItenEvent.emit(customerService);
  }

  public isInserted(id: number): boolean {
    return this.selectedCustomersService.some((element) => element.id === id);
  }
  
  public selectAllRetrive() {
    this.selectAllRetrieveEvent.emit();
  }
}
