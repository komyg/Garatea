import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions, ResponseType } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ContactService } from './contact.service';
import { Contact } from '../model/contact.model';

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

    const mockContactData: Contact = {
      senderEmail: 'my.email@email.com',
      senderName: 'John Doe',
      subject: 'Lorem ipsum',
      message: 'Lorem ipsum dolor sit amet',
      type: 0
    };

    // Listen and return an ok.
    mockBackend.connections.subscribe(
      (conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions(({ status: 200 }))));
    });

    service.sendContactData(mockContactData).subscribe((res: Response) => {
      expect(res.status).toEqual(200);
    });

  });

  it('should handle errors and log an error message', () => {

    const mockContactData: Contact = {
      senderEmail: 'my.email@email.com',
      senderName: 'John Doe',
      subject: 'Lorem ipsum',
      message: 'Lorem ipsum dolor sit amet',
      type: 0
    };

    mockBackend.connections.subscribe(
      (conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions({ status: 500, statusText: 'Error sending e-mail.', type: ResponseType.Error })));
    });

    service.sendContactData(mockContactData).subscribe((res: Response) => {

    },
    (error: any) => {
      expect(error).toContain('Error sending e-mail.');
    });

  });

});
