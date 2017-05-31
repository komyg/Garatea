import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions, ResponseType } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { TeamDataService } from './team-data.service';
import { Team } from '../model/team.model';

describe('TeamDataService', () => {

  let mockBackend: MockBackend;
  let service: TeamDataService;

  // Configure test bed.
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TeamDataService,
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
  beforeEach(async(inject([TeamDataService, MockBackend], (dataService, backend) => {
    service = dataService;
    mockBackend = backend;
  })));

  it('service and mockBackend should have been injected', () => {
    expect(service).toBeTruthy();
    expect(mockBackend).toBeTruthy();
  });

  it('should retrieve and return a team.model object', () => {

    const mockTeamData = [
        {
          name: 'Person 1',
          bio: 'Lorem ipsum',
          picture: '../../assets/img/team/img1.jpg'
        },
        {
          name: 'Person 2',
          bio: 'Dolor sit amet',
          picture: '../../assets/img/team/img2.jpg'
        },
        {
          name: 'Person 3',
          bio: 'Cogito ergo sum',
          picture: '../../assets/img/team/img3.jpg'
        }
    ];

    // Listen and return the mock data.
    mockBackend.connections.subscribe(
      (conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions(({ status: 200, body: JSON.stringify({ team: mockTeamData })
      }))));
    });

    // Check the results.
    service.getTeamData().then((teamData: Team[]) => {

      expect(teamData.length).toBe(3);

      expect(teamData[0]).toEqual(new Team({ name: 'Person 1', bio: 'Lorem ipsum', picture: '../../assets/img/team/img1.jpg' }));
      expect(teamData[1]).toEqual(new Team({ name: 'Person 2', bio: 'Dolor sit amet', picture: '../../assets/img/team/img2.jpg' }));
      expect(teamData[2]).toEqual(new Team({ name: 'Person 3', bio: 'Cogito ergo sum', picture: '../../assets/img/team/img3.jpg' }));
    });
  });

  it('should handle errors and return an error message', () => {

    const body = JSON.stringify({ message: 'Erro ao obter dados da equipe' });
    const opts = { type: ResponseType.Error, status: 404, body: body };
    const responseOpts = new ResponseOptions(opts);

    mockBackend.connections.subscribe(
      (conn: MockConnection) => {
        conn.mockRespond(new Response(responseOpts));
    });

    service.getTeamData().catch((errorMsg: string) => {
      expect(errorMsg).toEqual('ss');
    });
  });
});
