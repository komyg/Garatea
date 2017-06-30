import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Offer } from '../shared/model/offer.model';
import { OfferType } from '../shared/model/offer-type.enum';
import { OfferingsDataService } from '../shared/service/offerings-data.service';
import { OfferingsHelper } from '../shared/helper/offerings.helper';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {

  private appOfferingsData: Observable<Offer>;

  constructor(private offeringsDataService: OfferingsDataService) { }

  ngOnInit() {
    this.appOfferingsData = this.offeringsDataService.getOfferings(OfferType.app);
  }

  private getColsClass(offer: Offer): string {
    return OfferingsHelper.getColsClass(offer);
  }

}
