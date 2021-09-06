import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit {
  @Input() pageSize: number;
  @Input() length: number;
  @Input() pageSizeOptions: any[];
  @Output() pageEventEmitter: EventEmitter<number> = new EventEmitter();

  /*
  = {
    pageSize: 4,
    length: 100,
    pageSizeOptions: [2, 3, 4, 5]
  }
  */
  constructor() {}

  ngOnInit(): void {}

  public pageEvent(event: PageEvent) {
    this.pageEventEmitter.emit(event.pageIndex);
  }
}
