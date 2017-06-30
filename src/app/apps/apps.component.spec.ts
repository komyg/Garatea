import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { OfferType } from '../shared/model/offer-type.enum';
import { Offer } from '../shared/model/offer.model';
import { OfferingsDataService } from '../shared/service/offerings-data.service';

import { AppsComponent } from './apps.component';

describe('AppsComponent', () => {
  let component: AppsComponent;
  let fixture: ComponentFixture<AppsComponent>;

  beforeEach(async(() => {

    const mockData = {
      title: 'Lorem ipsum',
      subtitle: 'dolor sit amet.',
      services: [
        {
          title: 'App 1',
          description: 'Lorem ipsum dolor sit amet',
          icon: 'icon-1',
          link: 'url1'
        },
        {
          title: 'App 2',
          description: 'Cogito ergo sum',
          icon: 'icon-2',
          link: 'url2'
        },
      ]
    };

    const offeringsDataServiceStub = {
      getOfferings(type: OfferType): Observable<Offer> {
        return Observable.of(mockData);
      }
    };

    TestBed.configureTestingModule({
      declarations: [ AppsComponent ],
      providers: [{ provide: OfferingsDataService, useValue: offeringsDataServiceStub}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges(true);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a component with two icons', () => {

    // Check if the correct column cofinguration was created.
    const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.col-md-6'));
    expect(debugElements.length).toEqual(2);

    // Retrieve the titles that were added to this element.
    const titleArray: string[] = new Array();
    for (const element of debugElements) {
      titleArray.push(element.query(By.css('strong')).nativeElement.textContent);
    }

    expect(titleArray).toContain('App 1');
    expect(titleArray).toContain('App 2');
  });
});
