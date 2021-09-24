import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dumb-user',
  templateUrl: './dumb-user.component.html',
  styleUrls: ['./dumb-user.component.scss'],
})
export class DumbUserComponent implements OnInit {
  @Input() public users: any[];

  @Output() selectUserEvent: EventEmitter<any> = new EventEmitter();
  @Output() editUserEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteUserEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public selectUser(user: any) {
    this.selectUserEvent.emit(user);
  }

  public preventDefault(event: Event) {
    event.stopPropagation();
  }

  public edit(user: any) {
    this.editUserEvent.emit(user);
  }
  public delete(user: any) {
    this.deleteUserEvent.emit(user);
  }
}
