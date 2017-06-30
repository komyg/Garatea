import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Partner } from '../model/partner.model';

@Injectable()
export class PartnerDataService {

  private partnerDataUrl = 'assets/data/partner.json';

  constructor(private http: Http) { }

  public getPartnerData(): Observable<Partner[]> {
    return this.http.get(this.partnerDataUrl).map((res: Response) => res.json().partnerData as Partner[]).catch(this.handleError);
  }

  private handleError(error: Response) {
    const msg = 'Error retrieving partner data. Status: ' + error.status + ' ' + error.statusText;

    console.error(msg);
    return Observable.throw(msg);
  }

}
