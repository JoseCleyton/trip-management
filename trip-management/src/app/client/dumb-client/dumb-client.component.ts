import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dumb-client',
  templateUrl: './dumb-client.component.html',
  styleUrls: ['./dumb-client.component.scss'],
})
export class DumbClientComponent implements OnInit {
  @Input() public clients: any[];

  @Output() selectClientEvent: EventEmitter<any> = new EventEmitter();
  @Output() editClientEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteClientEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public selectClient(user: any) {
    this.selectClientEvent.emit(user);
  }

  public preventDefault(event: Event) {
    event.stopPropagation();
  }

  public edit(user: any) {
    this.editClientEvent.emit(user);
  }
  public delete(user: any) {
    this.deleteClientEvent.emit(user);
  }
}
