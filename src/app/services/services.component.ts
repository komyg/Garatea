import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Offer } from '../shared/model/offer.model';
import { OfferType } from '../shared/model/offer-type.enum';
import { OfferingsDataService } from '../shared/service/offerings-data.service';
import { OfferingsHelper } from '../shared/helper/offerings.helper';

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

   private getColsClass(offer: Offer): string {
     return OfferingsHelper.getColsClass(offer);
   }

}
