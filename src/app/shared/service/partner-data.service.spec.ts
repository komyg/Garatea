import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions, ResponseType } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { PartnerDataService } from './partner-data.service';
import { Partner } from '../model/partner.model';

describe('PartnerDataService', () => {

  let mockBackend: MockBackend;
  let service: PartnerDataService;

  // Configure test bed.
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PartnerDataService,
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
  beforeEach(async(inject([PartnerDataService, MockBackend], (dataService, backend) => {
    service = dataService;
    mockBackend = backend;
  })));

  it('service and mockBackend should have been injected', () => {
    expect(service).toBeTruthy();
    expect(mockBackend).toBeTruthy();
  });

  it('should retrieve and return a team.model object', () => {

    const mockData = [
        {
          img: '../../assets/img/team/img1.jpg'
        },
        {
          img: '../../assets/img/team/img2.jpg'
        },
        {
          img: '../../assets/img/team/img3.jpg'
        }
    ];

    // Listen and return the mock data.
    mockBackend.connections.subscribe(
      (conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions(({ status: 200, body: JSON.stringify({ partnerData: mockData })
      }))));
    });

    // Check the results.
    service.getPartnerData().subscribe((partners: Partner[]) => {

      expect(partners).toBeTruthy();
      expect(partners.length).toBe(3);

      expect(partners[0].img).toEqual(mockData[0].img);
      expect(partners[1].img).toEqual(mockData[1].img);
      expect(partners[2].img).toEqual(mockData[2].img);
    });
  });


  it('should handle errors and log an error message', () => {

    mockBackend.connections.subscribe(
      (conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions({ status: 404, statusText: 'Error getting partner data', type: ResponseType.Error })));
    });

    service.getPartnerData().subscribe((partners: Partner[]) => {
      expect(partners).toBeFalsy();
    },
    (error: any) => {
      expect(error).toContain('Error retrieving partner data.');
    });

  });

});
