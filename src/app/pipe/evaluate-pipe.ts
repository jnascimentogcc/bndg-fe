import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'evaluate'
})
export class EvaluatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let valueFormat: string = ''
    if (!value) {
      return valueFormat;
    }
    if (value.trim() === '0') {
      valueFormat = 'Not Evaluated'
    } else if (value.trim() === '1') {
      valueFormat = 'Evaluating...'
    } else if (value.trim() === '2') {
      valueFormat = 'Evaluated'
    }
    return valueFormat;
  }

}
