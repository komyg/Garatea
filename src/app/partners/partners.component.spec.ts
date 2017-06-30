import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { PartnersComponent } from './partners.component';
import { PartnerDataService } from '../shared/service/partner-data.service';
import { Partner } from '../shared/model/partner.model';
import { CarouselItemFilterPipe } from '../shared/pipe/carousel-item-filter.pipe';
import { NumberCountPipe } from '../shared/pipe/number-count.pipe';

describe('PartnersComponent', () => {

  let component: PartnersComponent;
  let fixture: ComponentFixture<PartnersComponent>;

  beforeEach(async(() => {

    const mockTeamMembers: Partner[] = [
      {
        name: '',
        description: '',
        img: './img/team/01.jpg'
      },
      {
        name: '',
        description: '',
        img: './img/team/02.jpg'
      },
      {
        name: '',
        description: '',
        img: './img/team/03.jpg'
      },
      {
        name: '',
        description: '',
        img: './img/team/04.jpg'
      },
      {
        name: '',
        description: '',
        img: './img/team/05.jpg'
      }
    ];

    const mockPartnerService = {
      getPartnerData(): Observable<Partner[]> {
        return Observable.of(mockTeamMembers);
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        PartnersComponent,
        CarouselItemFilterPipe,
        NumberCountPipe ],
      imports: [ NgbModule.forRoot() ],
      providers: [ { provide: PartnerDataService, useValue: mockPartnerService } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnersComponent);
    fixture.autoDetectChanges(true);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
