import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions, ResponseType } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Offer } from '../model/offer.model';
import { OfferType } from '../model/offer-type.enum';

import { OfferingsDataService } from './offerings-data.service';

describe('OfferingsService', () => {

  let mockBackend: MockBackend;
  let service: OfferingsDataService;

  // Configure test bed.
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OfferingsDataService,
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
  beforeEach(async(inject([OfferingsDataService, MockBackend], (dataService, backend) => {
    service = dataService;
    mockBackend = backend;
  })));

  it('service and mockBackend should have been injected', () => {
    expect(service).toBeTruthy();
    expect(mockBackend).toBeTruthy();
  });

  it('should retrieve offerings data', () => {

    const mockData = {
      title: 'Lorem ipsum',
      subtitle: 'dolor sit amet.',
      services: [
        {
          title: 'Offer 1',
          description: 'Lorem ipsum dolor sit amet',
          icon: 'icon-1',
          link: 'url1'
        },
        {
          title: 'Offer 2',
          description: 'Cogito ergo sum',
          icon: 'icon-2',
          link: 'url2'
        },
      ]
    };

    // Listen and return the mock data.
    mockBackend.connections.subscribe(
      (conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions(({ status: 200, body: JSON.stringify({ offerings: mockData })
      }))));
    });

    service.getOfferings(OfferType.service).subscribe((data: Offer) => {

      expect(data.title).toEqual(mockData.title);
      expect(data.subtitle).toEqual(mockData.subtitle);
      expect(data.services.length).toBe(mockData.services.length);
      expect(data.services[0].icon).toBe(mockData.services[0].icon);

    });

  });

  it('should handle errors and log an error message', () => {

    mockBackend.connections.subscribe(
      (conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions({ status: 404, statusText: 'Error getting the offerings data.', type: ResponseType.Error })));
    });

    service.getOfferings(OfferType.service).subscribe((data: Offer) => {
      expect(data).toBeFalsy();
    },
    (error: any) => {
      expect(error).toContain('Error retrieving offerings data.');
    });

  });

});
