import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'datePipeTransform',
})
export class datePipeFormatPipe implements PipeTransform {
  transform(value: string, format: string) {
    var datePipe = new DatePipe('pt-BR');
    value = datePipe.transform(value, format);
    return value;
  }
}
