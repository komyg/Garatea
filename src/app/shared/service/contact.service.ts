import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Contact } from '../model/contact.model';

@Injectable()
export class ContactService {

  private contactServletUrl = 'http://localhost:8080/email';

  constructor(private http: Http) { }

  /**
   * Sends the contact data via HTTP POST to the backend, where it will be
   * processed and sent as an e-mail.
   */
  public sendContactData(data: Contact): Observable<Response> {

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.contactServletUrl, JSON.stringify(data), options).catch(this.handleError);
  }

  private handleError(error: Response) {
    const msg = 'Error sending e-mail. ' + error.toString();

    console.error(msg);
    return Observable.throw(msg);
  }
}
