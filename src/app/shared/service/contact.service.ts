import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { Contact } from '../model/contact.model';
import { ServiceResponse } from '../model/service-response.model';

@Injectable()
export class ContactService {

  private contactServletUrl = 'http//localhost:3000/Contact';

  constructor(private http: Http) { }

  /**
   * Sends the contact data via HTTP POST to the backend, where it will be
   * processed and sent as an e-mail.
   */
  sendContactData(data: Contact): Promise<ServiceResponse> {

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.contactServletUrl, { body: JSON.stringify({contact: data}) }, options).toPromise()
      .then((res: Response) => {
        const serviceResponse: ServiceResponse = new ServiceResponse();
        serviceResponse.status = res.status;
        serviceResponse.message = 'E-mail enviado com sucesso.';
        serviceResponse.successs = true;

        return serviceResponse;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any): Promise<ServiceResponse> {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    const serviceResponse: ServiceResponse = new ServiceResponse();

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;

      serviceResponse.status = error.status;
    }
    else {
      errMsg = error.message ? error.message : error.toString();
    }

    serviceResponse.message = errMsg;
    serviceResponse.successs = false;

    console.error(errMsg);
    return Promise.reject(serviceResponse);
  }
}
