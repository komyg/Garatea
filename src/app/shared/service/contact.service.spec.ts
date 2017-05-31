import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions, ResponseType } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ContactService } from './contact.service';
import { Contact } from '../model/contact.model';
import { ServiceResponse } from '../model/service-response.model';

describe('ContactService', () => {

  let mockBackend: MockBackend;
  let service: ContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContactService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  // Inject the service
  beforeEach(async(inject([ContactService, MockBackend], (dataService, backend) => {
    service = dataService;
    mockBackend = backend;
  })));

  it('should create the service', () => {
    expect(service).toBeTruthy();
    expect(mockBackend).toBeTruthy();
  });

  it('should post the contact data via HTTP', () => {

    let result: Promise<ServiceResponse>;

    const mockContactData: Contact = {
      senderEmail: 'my.email@email.com',
      senderName: 'John Doe',
      subject: 'Lorem ipsum',
      message: 'Lorem ipsum dolor sit amet'
    };

    // Listen and return an ok.
    mockBackend.connections.subscribe(
      (conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions(({ status: 200 }))));
    });

    result = service.sendContactData(mockContactData);
    result.then((response: ServiceResponse) => {
      expect(response.status).toEqual(200);
    });

  });

  it('should handle any errors during the post', () => {

    let result: Promise<ServiceResponse>;

    const body = JSON.stringify({ message: 'Erro ao enviar e-mail' });
    const opts = { type: ResponseType.Error, status: 404, body: body };
    const responseOpts = new ResponseOptions(opts);

    mockBackend.connections.subscribe(
      (conn: MockConnection) => {
        conn.mockRespond(new Response(responseOpts));
    });

    result = service.sendContactData(new Contact());
    result.catch((response: ServiceResponse) => {
      expect(response.status).toEqual(404);
    });
  });

});
