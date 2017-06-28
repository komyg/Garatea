import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Offer } from '../shared/model/offer.model';
import { OfferType } from '../shared/model/offer-type.enum';
import { OfferingsDataService } from '../shared/service/offerings-data.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  private serviceOfferingsObservable: Observable<Offer>;

  constructor(private offeringsDataService: OfferingsDataService) { }

  ngOnInit() {
    this.serviceOfferingsObservable = this.offeringsDataService.getOfferings(OfferType.service);
  }

  /**
   * Calculates the number of cols required, based on the number of elements available.
   */
  private getColsClass(offer: Offer): string {
    let colsClass;
    const numCols = 12 / offer.services.length;

    colsClass = 'col-md-' + numCols;

    if (offer.services.length >= 2) {
      colsClass += ' col-sm-6';
    }

    return colsClass;
  }

}
