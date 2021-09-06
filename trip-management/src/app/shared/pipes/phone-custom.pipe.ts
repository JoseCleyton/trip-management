import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneCustom',
})
export class PhoneCustomPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const phone =
      '(' +
      value.substring(0, 2) +
      ')' +
      value.substring(2, 3) +
      '.' +
      value.substring(3, 7) +
      '-' +
      value.substring(7, 11);
    return phone;
  }
}
