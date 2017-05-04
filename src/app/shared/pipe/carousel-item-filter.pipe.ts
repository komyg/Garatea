import { Pipe, PipeTransform } from '@angular/core';
import { Team } from '../model/team.model';

@Pipe({
  name: 'carouselItemFilter'
})
export class CarouselItemFilterPipe implements PipeTransform {

  /**
   * This pipe returns an array of team members based on the number of team members per page
   * and its offset.
   */
  transform(value: Team[], numItemsPerPage: number, offset: number): Team[] {
    const res: Team[] = new Array<Team>();
    let numItemsCount: number;
    let offsetCount: number;

    offsetCount = offset * numItemsPerPage; // Start the count of items considering the current offset.
    numItemsCount = 0; // Add items up to the max per page.

    while (offsetCount < value.length && numItemsCount < numItemsPerPage) {
      res.push(value[offsetCount]);

      offsetCount++;
      numItemsCount++;
    }

    return res;
  }

}
