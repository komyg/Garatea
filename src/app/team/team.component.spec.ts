import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TeamComponent } from './team.component';
import { TeamDataService } from '../shared/service/team-data.service';
import { Team } from '../shared/model/team.model';
import { CarouselItemFilterPipe } from '../shared/pipe/carousel-item-filter.pipe';
import { NumberCountPipe } from '../shared/pipe/number-count.pipe';

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;

  beforeEach(async(() => {

    const mockTeamMembers: Team[] = [
      {
        name: 'Person 1',
        bio: 'Lorem ipsum',
        picture: './img/team/01.jpg'
      },
      {
        name: 'Person 2',
        bio: 'Dolor sit amet',
        picture: './img/team/02.jpg'
      },
      {
        name: 'Person 3',
        bio: 'consectetur adipiscing elit.',
        picture: './img/team/03.jpg'
      },
      {
        name: 'Person 4',
        bio: 'Integer venenatis ante lorem,',
        picture: './img/team/04.jpg'
      },
      {
        name: 'Person 5',
        bio: 'sed pulvinar nulla mattis sed.',
        picture: './img/team/05.jpg'
      }
    ];

    const mockTeamService = {
      getTeamData(): Promise<Team[]> {
        return Promise.resolve(mockTeamMembers);
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        TeamComponent,
        CarouselItemFilterPipe,
        NumberCountPipe ],
      imports: [ NgbModule.forRoot() ],
      providers: [ { provide: TeamDataService, useValue: mockTeamService } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamComponent);
    fixture.autoDetectChanges(true);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a carousel with the team data', () => {

    // Get all names of the team members inside the active carousel items.
    const caroulselItems: DebugElement[] = fixture.debugElement.queryAll(By.css('.team-member-name'));

    // Add the team members names to a separate string.
    const teamMembersNames: string[] = new Array<string>();
    for (const item of caroulselItems) {
      teamMembersNames.push(item.nativeElement.textContent);
    }

    expect(teamMembersNames).toContain('Person 1');
    expect(teamMembersNames).toContain('Person 2');
    expect(teamMembersNames).toContain('Person 3');
    expect(teamMembersNames).toContain('Person 4');
    expect(teamMembersNames).toContain('Person 5');
  });
});
