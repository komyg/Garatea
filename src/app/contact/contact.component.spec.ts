import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Response, ResponseOptions } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { FormsModule } from '@angular/forms';

import { ContactComponent } from './contact.component';
import { Contact } from '../shared/model/contact.model';
import { ContactService } from '../shared/service/contact.service';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let mockService;

  let fakeModel: Contact;
  let senderName: DebugElement;
  let senderEmail: DebugElement;
  let subject: DebugElement;
  let message: DebugElement;

  beforeEach(async(() => {

    //mockService = jasmine.createSpyObj('ContactService', ['sendContactData']);

    mockService = {
      sendContactData(data: Contact): Observable<Response> {
        return Observable.of(new Response(new ResponseOptions(({ status: 200 }))));
      }
    };

    TestBed.configureTestingModule({
      declarations: [ ContactComponent ],
      imports: [ FormsModule ],
      providers: [ { provide: ContactService, useValue: mockService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(() => {

    fakeModel = new Contact();
    fakeModel.senderName = 'My name';
    fakeModel.senderEmail = 'my.email@test.com';
    fakeModel.subject = 'Lorem ipsum';
    fakeModel.message = 'Dolor sit amet';
    fakeModel.type = 0;

    // Get elements
    senderName = fixture.debugElement.query(By.css('#senderName'));
    senderEmail = fixture.debugElement.query(By.css('#senderEmail'));
    subject = fixture.debugElement.query(By.css('#subject'));
    message = fixture.debugElement.query(By.css('#message'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the data in the senderName field and update the model', fakeAsync(() => {

    // Create event to trigger the change of the name field.
    const evt = document.createEvent('Event');
    evt.initEvent('input', true, false);

    // Change input field value and fire an event to notify the DOM and Angular.
    senderName.nativeElement.value = 'My Name';
    senderName.nativeElement.dispatchEvent(evt);

    fixture.detectChanges();
    tick();

    // Check if the model was updated and the value is valid.
    expect(senderName.nativeElement.value).toEqual('My Name');
    expect(component.contactModel.senderName).toEqual('My Name');
    expect(senderName.classes['ng-valid']).toBeTruthy();

    // Change input field value and fire an event to notify the DOM and Angular.
    senderName.nativeElement.value = '';
    senderName.nativeElement.dispatchEvent(evt);

    fixture.detectChanges();
    tick();

    // Check if the model was updated and the value is valid.
    expect(senderName.nativeElement.value).toEqual('');
    expect(component.contactModel.senderName).toEqual('');
    expect(senderName.classes['ng-valid']).toBeFalsy();

  }));

  it('should validate the data in the senderEmail field and update the model', fakeAsync(() => {

    // Create event to trigger the change of the name field.
    const evt = document.createEvent('Event');
    evt.initEvent('input', true, false);

    // Add valid value and test
    senderEmail.nativeElement.value = 'my.email@test.com';
    senderEmail.nativeElement.dispatchEvent(evt);

    fixture.detectChanges();
    tick();

    expect(senderEmail.nativeElement.value).toEqual('my.email@test.com');
    expect(component.contactModel.senderEmail).toEqual('my.email@test.com');
    expect(senderEmail.classes['ng-valid']).toBeTruthy();

    // Add invalid value and test.
    senderEmail.nativeElement.value = 'my.email';
    senderEmail.nativeElement.dispatchEvent(evt);

    fixture.detectChanges();
    tick();

    expect(senderEmail.nativeElement.value).toEqual('my.email');
    expect(component.contactModel.senderEmail).toEqual('my.email');
    expect(senderEmail.classes['ng-valid']).toBeFalsy();

    // Add empty value and test.
    senderEmail.nativeElement.value = '';
    senderEmail.nativeElement.dispatchEvent(evt);

    fixture.detectChanges();
    tick();

    // Check if the model was updated and the value is valid.
    expect(senderEmail.nativeElement.value).toEqual('');
    expect(component.contactModel.senderEmail).toEqual('');
    expect(senderEmail.classes['ng-valid']).toBeFalsy();

  }));

  it('should validate the data in the subject field and update the model', fakeAsync(() => {

    // Create event to trigger the change of the name field.
    const evt = document.createEvent('Event');
    evt.initEvent('input', true, false);

    // Add a value to the field and test.
    subject.nativeElement.value = 'My Subject';
    subject.nativeElement.dispatchEvent(evt);

    fixture.detectChanges();
    tick();

    // Check if the model was updated and the value is valid.
    expect(subject.nativeElement.value).toEqual('My Subject');
    expect(component.contactModel.subject).toEqual('My Subject');
    expect(subject.classes['ng-valid']).toBeTruthy();

    // Add an empty value and test.
    subject.nativeElement.value = '';
    subject.nativeElement.dispatchEvent(evt);

    fixture.detectChanges();
    tick();

    // Check if the model was updated and the value is valid.
    expect(subject.nativeElement.value).toEqual('');
    expect(component.contactModel.subject).toEqual('');
    expect(subject.classes['ng-valid']).toBeFalsy();

  }));

  it('should validate the data in the message field and update the model', fakeAsync(() => {

    // Create event to trigger the change of the name field.
    const evt = document.createEvent('Event');
    evt.initEvent('input', true, false);

    // Add a value to the field and test.
    message.nativeElement.value = 'My Message';
    message.nativeElement.dispatchEvent(evt);

    fixture.detectChanges();
    tick();

    // Check if the model was updated and the value is valid.
    expect(message.nativeElement.value).toEqual('My Message');
    expect(component.contactModel.message).toEqual('My Message');
    expect(message.classes['ng-valid']).toBeTruthy();

    // Add an empty value and test.
    message.nativeElement.value = '';
    message.nativeElement.dispatchEvent(evt);

    fixture.detectChanges();
    tick();

    // Check if the model was updated and the value is valid.
    expect(message.nativeElement.value).toEqual('');
    expect(component.contactModel.message).toEqual('');
    expect(message.classes['ng-valid']).toBeFalsy();

  }));

  it('should enable the submit button if all the data is correct', fakeAsync(() => {

    // Create event to trigger the change of the name field.
    const evt = document.createEvent('Event');
    evt.initEvent('input', true, false);

    fixture.detectChanges();
    tick();

    const submitButton: DebugElement = fixture.debugElement.query(By.css('#submitButton'));
    expect(submitButton.nativeElement.disabled).toBeTruthy();

    // Set values
    senderName.nativeElement.value = 'My name';
    senderEmail.nativeElement.value = 'my.email@test.com';
    subject.nativeElement.value = 'Lorem ipsum';
    message.nativeElement.value = 'Dolor sit amet';

    // Fire input events.
    senderName.nativeElement.dispatchEvent(evt);
    senderEmail.nativeElement.dispatchEvent(evt);
    subject.nativeElement.dispatchEvent(evt);
    message.nativeElement.dispatchEvent(evt);

    fixture.detectChanges();
    tick();

    expect(submitButton.nativeElement.disabled).toBeFalsy();

    // Set invalid values
    senderName.nativeElement.value = '';
    senderEmail.nativeElement.value = '';
    subject.nativeElement.value = '';
    message.nativeElement.value = '';

    // Fire input events.
    senderName.nativeElement.dispatchEvent(evt);
    senderEmail.nativeElement.dispatchEvent(evt);
    subject.nativeElement.dispatchEvent(evt);
    message.nativeElement.dispatchEvent(evt);

    fixture.detectChanges();
    tick();

    expect(submitButton.nativeElement.disabled).toBeTruthy();

  }));

  it('should submit the contact data when the submit button is clicked', fakeAsync(() => {

    // Create event to trigger the change of the name field.
    const inputEvt = document.createEvent('Event');
    inputEvt.initEvent('input', true, false);

    const submitButton: DebugElement = fixture.debugElement.query(By.css('#submitButton'));

    // Set values
    senderName.nativeElement.value = fakeModel.senderName;
    senderEmail.nativeElement.value = fakeModel.senderEmail;
    subject.nativeElement.value = fakeModel.subject;
    message.nativeElement.value = fakeModel.message;

    // Fire input events.
    senderName.nativeElement.dispatchEvent(inputEvt);
    senderEmail.nativeElement.dispatchEvent(inputEvt);
    subject.nativeElement.dispatchEvent(inputEvt);
    message.nativeElement.dispatchEvent(inputEvt);

    fixture.detectChanges();
    tick();

    const contactService: ContactService = fixture.debugElement.injector.get(ContactService);
    spyOn(contactService, 'sendContactData');

    submitButton.nativeElement.click();
    fixture.detectChanges();
    tick();

    expect(contactService.sendContactData).toHaveBeenCalledWith(fakeModel);
  }));

  it('should display the appropriate feedback to the user when the submit button is clicked', fakeAsync(() => {
    // Create event to trigger the change of the name field.
    const inputEvt = document.createEvent('Event');
    inputEvt.initEvent('input', true, false);

    const submitButton: DebugElement = fixture.debugElement.query(By.css('#submitButton'));
    const successLabel: DebugElement = fixture.debugElement.query(By.css('#successLabel'));
    const errorLabel: DebugElement = fixture.debugElement.query(By.css('#errorLabel'));

    // Override contact service return values.
    const contactService: ContactService = fixture.debugElement.injector.get(ContactService);
    spyOn(contactService, 'sendContactData').and.returnValues(Observable.of(new Response(new ResponseOptions(({ status: 200 })))),
      Observable.throw(new Response(new ResponseOptions(({ status: 500 })))));

    // Set values
    senderName.nativeElement.value = fakeModel.senderName;
    senderEmail.nativeElement.value = fakeModel.senderEmail;
    subject.nativeElement.value = fakeModel.subject;
    message.nativeElement.value = fakeModel.message;

    // Fire input events.
    senderName.nativeElement.dispatchEvent(inputEvt);
    senderEmail.nativeElement.dispatchEvent(inputEvt);
    subject.nativeElement.dispatchEvent(inputEvt);
    message.nativeElement.dispatchEvent(inputEvt);

    fixture.detectChanges();
    tick();

    expect(submitButton.nativeElement.textContent).toContain('Enviar');
    expect(successLabel.nativeElement.hidden).toBeTruthy();
    expect(errorLabel.nativeElement.hidden).toBeTruthy();

    submitButton.nativeElement.click();
    fixture.detectChanges();

    tick();

    expect(submitButton.nativeElement.textContent).toContain('Enviar');
    expect(successLabel.nativeElement.hidden).toBeFalsy();
    expect(errorLabel.nativeElement.hidden).toBeTruthy();

    submitButton.nativeElement.click();
    fixture.detectChanges();

    tick();

    expect(submitButton.nativeElement.textContent).toContain('Enviar');
    expect(successLabel.nativeElement.hidden).toBeTruthy();
    expect(errorLabel.nativeElement.hidden).toBeFalsy();

  }));

});
