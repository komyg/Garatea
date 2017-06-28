import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AboutComponent } from './about.component';
import { AboutDataService } from '../shared/service/about-data.service';
import { About } from '../shared/model/about.model';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {

    // Create mock data and a mock service stub.
    const mockAboutData = new About();
    mockAboutData.whatIsIt = { title: 'Title 1', description: 'Lorem ipsum' };
    mockAboutData.howItWorks = { title: 'Title 2', description: 'Dolor sit amet' };

    const aboutDataServiceStub: any = {
      getAboutData(): Promise<About> {
        return Promise.resolve(mockAboutData);
      }
    };

    // Create test bed
    TestBed.configureTestingModule({
      declarations: [ AboutComponent ],
      providers: [ { provide: AboutDataService, useValue:  aboutDataServiceStub }]
    })
    .compileComponents();

    // Create the component
    // Node: this code must be inside Async, because the component UI is changed depending on the results
    // of the aboutDataServiceStub.getAboutData promise.
    fixture = TestBed.createComponent(AboutComponent);
    fixture.autoDetectChanges(true);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the titles obtained from the about service', async(() => {

    // Get all the title elements.
    const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.about-title'));
    const strArray: string[] = new Array<string>();

    expect(debugElements.length).toEqual(2);

    // Add their contents to an array
    for (const element of debugElements) {
      strArray.push(element.nativeElement.textContent);
    }

    // Check if the titles were added correctly
    expect(strArray).toContain('Title 1');
    expect(strArray).toContain('Title 2');
  }));

  it('should display the description obtained from the about service', async(() => {

    // Get all the description (intro) elements.
    const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.intro'));
    const strArray: string[] = new Array<string>();

    expect(debugElements.length).toEqual(2);

    // Add their contents to an array
    for (const element of debugElements) {
      strArray.push(element.nativeElement.textContent);
    }

    // Check if the descriptions were added correctly
    expect(strArray).toContain('Lorem ipsum');
    expect(strArray).toContain('Dolor sit amet');
  }));
});
