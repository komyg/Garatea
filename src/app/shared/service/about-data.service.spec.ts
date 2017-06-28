import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions, ResponseType } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { AboutDataService } from './about-data.service';
import { About } from '../model/about.model';

describe('AboutDataService', () => {

  let mockBackend: MockBackend;
  let service: AboutDataService;

  // Configure test bed.
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AboutDataService,
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
  beforeEach(async(inject([AboutDataService, MockBackend], (dataService, backend) => {
    service = dataService;
    mockBackend = backend;
  })));

  it('service and mockBackend should have been injected', () => {
    expect(service).toBeTruthy();
    expect(mockBackend).toBeTruthy();
  });

  it('should retrieve and return an about.model object', fakeAsync(() => {

    let result: About;

    const mockAboutData: any = {
      whatIsIt: {
        title: 'Title 1',
        description: 'Lorem ipsum'
      },
      howItWorks: {
        title: 'Title 2',
        description: 'Dolor sit amet'
      },
      howItStarted: {
        title: 'Title 3',
        description: 'Cogito ergo sum',
        link: 'http://www.google.com'
      }
    };

    // Listen and rerturn the mock data.
    mockBackend.connections.subscribe (
      (conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions(({ status: 200, body: JSON.stringify({ about: mockAboutData })
      }))));
    });

    // Check the results.
    service.getAboutData().then((aboutData: About) => {
      result = aboutData;
    });

    tick();

    expect(result).toBeTruthy();

    expect(result.whatIsIt.title).toBe('Title 1');
    expect(result.whatIsIt.description).toBe('Lorem ipsum');

    expect(result.howItWorks.title).toBe('Title 2');
    expect(result.howItWorks.description).toBe('Dolor sit amet');

    expect(result.howItStarted.title).toBe('Title 3');
    expect(result.howItStarted.description).toBe('Cogito ergo sum');
    expect(result.howItStarted.link).toBe('http://www.google.com');

  }));

  it('should handle errors and log an error message', () => {

    mockBackend.connections.subscribe(
      (conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions({ status: 404, statusText: 'Erro ao obter dados', type: ResponseType.Error })));
    });

    service.getAboutData().catch((about: About) => {
      expect(about).toBeFalsy();
    });
  });
});
