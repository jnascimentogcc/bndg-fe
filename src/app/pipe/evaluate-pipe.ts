import { Pipe, PipeTransform } from '@angular/core';
import {transformEvaluate} from '../util/utils';

@Pipe({
  name: 'evaluate'
})
export class EvaluatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return transformEvaluate(value)
  }

}
