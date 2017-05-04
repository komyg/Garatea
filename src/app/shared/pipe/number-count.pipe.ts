import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberCount'
})
export class NumberCountPipe implements PipeTransform {

  /**
   * Returns an array of numbers from 0 to value - 1.
   */
  transform(value: number, args?: any): Array<number> {
    const res: Array<number> = new Array<number>();
    let i: number;

    for (i = 0; i < value; i++) {
      res.push(i);
    }

    return res;
  }

}
