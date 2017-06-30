import { Offer } from '../model/offer.model';

export class OfferingsHelper {

  /**
   * Calculates the number of cols required, based on the number of elements available.
   */
  public static getColsClass(offer: Offer): string {
    let colsClass;
    const numCols = 12 / offer.services.length;

    colsClass = 'col-md-' + numCols;

    if (offer.services.length >= 2) {
      colsClass += ' col-sm-6';
    }

    return colsClass;
  }
}
