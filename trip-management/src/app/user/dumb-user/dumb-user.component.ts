import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dumb-user',
  templateUrl: './dumb-user.component.html',
  styleUrls: ['./dumb-user.component.scss'],
})
export class DumbUserComponent implements OnInit {
  @Input() public users: any[];

  @Output() public selectUserEvent: EventEmitter<any> = new EventEmitter();
  @Output() public editUserEvent: EventEmitter<any> = new EventEmitter();
  @Output() public deleteUserEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public selectUser(customerService: any) {
    this.selectUserEvent.emit(customerService);
  }

  public preventDefault(event: Event) {
    event.stopPropagation();
  }

  public edit(customerService: any) {
    this.editUserEvent.emit(customerService);
  }

  public delete(customerService: any) {
    this.deleteUserEvent.emit(customerService);
  }
}
