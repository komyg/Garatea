import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Offer } from '../model/offer.model';
import { OfferType } from '../model/offer-type.enum';

@Injectable()
export class OfferingsDataService {

  private serviceOfferingsUrl = 'assets/data/service-offerings.json';
  private appOfferingsUrl = 'assets/data/app-offerings.json';

  constructor(private http: Http) { }

  /**
   * Retrieves different types of offers depending on the desired type.
   */
  public getOfferings(type: OfferType): Observable<Offer> {

    const url: string = this.getOfferUrl(type);

    return this.http.get(url).map((res: Response) => res.json().offerings as Offer);
  }

  // Retrieves the offer URL
  private getOfferUrl(type: OfferType): string {

    switch (type) {
      case OfferType.service:
        return this.serviceOfferingsUrl;

      case OfferType.app:
        return this.appOfferingsUrl;
    }
  }

}
