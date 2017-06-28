import { CarouselHelper } from './carousel.helper';

describe('Carousel Helper tests', () => {

  it('should calculate the correct number of items per page', () => {

    let numItemsPerPage: number;

    numItemsPerPage = CarouselHelper.calcNumItensPerPage(1024);
    expect(numItemsPerPage).toEqual(4);

    numItemsPerPage = CarouselHelper.calcNumItensPerPage(800);
    expect(numItemsPerPage).toEqual(2);

    numItemsPerPage = CarouselHelper.calcNumItensPerPage(600);
    expect(numItemsPerPage).toEqual(1);

  });

  it('should calculate the correct number of pages', () => {

    let numPages: number;

    numPages = CarouselHelper.calcNumPages(3, 4);
    expect(numPages).toEqual(1);

    numPages = CarouselHelper.calcNumPages(5, 4);
    expect(numPages).toEqual(2);

    numPages = CarouselHelper.calcNumPages(5, 2);
    expect(numPages).toEqual(3);

  });

});
