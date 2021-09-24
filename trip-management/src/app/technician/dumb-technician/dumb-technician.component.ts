import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dumb-technician',
  templateUrl: './dumb-technician.component.html',
  styleUrls: ['./dumb-technician.component.scss']
})
export class DumbTechnicianComponent implements OnInit {
  @Input() public technicians: any[];

  @Output() selectTechnicianEvent: EventEmitter<any> = new EventEmitter();
  @Output() editTechnicianEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteTechnicianEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public selectTechnician(technician: any) {
    this.selectTechnicianEvent.emit(technician);
  }

  public preventDefault(event: Event) {
    event.stopPropagation();
  }

  public edit(technician: any) {
    this.editTechnicianEvent.emit(technician);
  }
  public delete(technician: any) {
    this.deleteTechnicianEvent.emit(technician);
  }
}
