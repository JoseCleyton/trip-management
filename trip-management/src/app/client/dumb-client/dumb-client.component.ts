import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from 'src/app/shared/model/client.model';

@Component({
  selector: 'app-dumb-client',
  templateUrl: './dumb-client.component.html',
  styleUrls: ['./dumb-client.component.scss'],
})
export class DumbClientComponent implements OnInit {
  @Input() public clients: Client[];

  @Output() selectClientEvent: EventEmitter<any> = new EventEmitter();
  @Output() editClientEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteClientEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public selectClient(user: Client) {
    this.selectClientEvent.emit(user);
  }

  public preventDefault(event: Event) {
    event.stopPropagation();
  }

  public edit(user: Client) {
    this.editClientEvent.emit(user);
  }
  public delete(user: Client) {
    this.deleteClientEvent.emit(user);
  }
}
