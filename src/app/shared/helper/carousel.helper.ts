export class CarouselHelper {

  /**
   * Calculates the max number of items per page on the carousel, based on the current screen resolution.
   * Note: the secreen sizes were taken from bootstrap.
   */
  public static calcNumItensPerPage(windowWidth: number): number {

    let numItemsPerPage: number;
    numItemsPerPage = 0;

    if (windowWidth >= 970) {
      numItemsPerPage = 4;
    }
    else if (windowWidth > 768 && windowWidth < 970) {
      numItemsPerPage = 2;
    }
    else if (windowWidth <= 768) {
      numItemsPerPage = 1;
    }

    return numItemsPerPage;
  }

  /**
   * Calculates the number of required pages for the carousel, based on the number of items.
   */
  public static calcNumPages(numItems: number, numItemsPerPage: number) {
    return Math.ceil(numItems / numItemsPerPage);
  }

}
