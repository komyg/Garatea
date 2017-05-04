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
    return this.http.get(this.aboutDataUrl).toPromise().then( (res: Response) => {

      return new About(res.json().about);

    }).catch(this.handleError);
  }

  private handleError(error: Error): string {
    let errorMsg: string;

    errorMsg = 'Ocorreu um erro: ' + error.message + ' por favor entre em contato com o administrador do sistema.';
    console.error(error.message);
    console.error(error.stack);

    return errorMsg;
  }
}
