import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { About } from '../model/about.model';

@Injectable()
export class AboutDataService {

  private aboutDataUrl = 'assets/data/about.json';

  constructor(private http: Http) { }

  /**
   * Retrieves the data that should be displayed in the about component.
   * Returns - a promise containing an array of About objects.
   */
  public getAboutData(): Promise<About> {

    // Retrieve the about data and return it as a promise.
    return this.http.get(this.aboutDataUrl).toPromise().then((res: Response) => {

      if (!res.ok) {
        return this.handleError(res);
      }

      return new About(res.json().about);
    });
  }

  private handleError(error: any): Promise<About> {

    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }
    else if (error) {
      errMsg = error.message ? error.message : error.toString();
    }
    else {
      errMsg = 'An error has occurred in the about data service.';
    }

    console.error(errMsg);
    return Promise.reject(undefined);
  }
}
