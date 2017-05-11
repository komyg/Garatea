import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { ContactComponent } from './contact.component';
import { Contact } from '../shared/model/contact.model';
import { ContactService } from '../shared/service/contact.service';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let mockService: ContactService;

  beforeEach(async(() => {

    mockService = {
      sendContactData(data: Contact) {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the data in the senderName field and update the model', fakeAsync(() => {

    // Create event to trigger the change of the name field.
    const evt = document.createEvent('Event');
    evt.initEvent('input', true, false);

    // Retrieve the input element.
    const inputElement: DebugElement = fixture.debugElement.query(By.css('#senderName'));

    // Change input field value and fire an event to notify the DOM and Angular.
    inputElement.nativeElement.value = 'My Name';
    inputElement.nativeElement.dispatchEvent(evt);

    fixture.detectChanges();
    tick();

    // Check if the model was updated and the value is valid.
    expect(inputElement.nativeElement.value).toEqual('My Name');
    expect(component.contactModel.senderName).toEqual('My Name');
    expect(inputElement.classes['ng-valid']).toBeTruthy();

    // Change input field value and fire an event to notify the DOM and Angular.
    inputElement.nativeElement.value = '';
    inputElement.nativeElement.dispatchEvent(evt);

    fixture.detectChanges();
    tick();

    // Check if the model was updated and the value is valid.
    expect(inputElement.nativeElement.value).toEqual('');
    expect(component.contactModel.senderName).toEqual('');
    expect(inputElement.classes['ng-valid']).toBeFalsy();

  }));

  it('should validate the data in the senderEmail field and update the model', fakeAsync(() => {

    // Retrieve the input element.
    const inputElement: DebugElement = fixture.debugElement.query(By.css('#senderEmail'));

    // Create event to trigger the change of the name field.
    const evt = document.createEvent('Event');
    evt.initEvent('input', true, false);

    // Add valid value and test
    inputElement.nativeElement.value = 'my.email@test.com';
    inputElement.nativeElement.dispatchEvent(evt);

    fixture.detectChanges();
    tick();

    expect(inputElement.nativeElement.value).toEqual('my.email@test.com');
    expect(component.contactModel.senderEmail).toEqual('my.email@test.com');
    expect(inputElement.classes['ng-valid']).toBeTruthy();

    // Add invalid value and test.
    inputElement.nativeElement.value = 'my.email';
    inputElement.nativeElement.dispatchEvent(evt);

    fixture.detectChanges();
    tick();

    expect(inputElement.nativeElement.value).toEqual('my.email');
    expect(component.contactModel.senderEmail).toEqual('my.email');
    expect(inputElement.classes['ng-valid']).toBeFalsy();

    // Add empty value and test.
    inputElement.nativeElement.value = '';
    inputElement.nativeElement.dispatchEvent(evt);

    fixture.detectChanges();
    tick();

    // Check if the model was updated and the value is valid.
    expect(inputElement.nativeElement.value).toEqual('');
    expect(component.contactModel.senderEmail).toEqual('');
    expect(inputElement.classes['ng-valid']).toBeFalsy();

  }));

  it('should validate the data in the subject field and update the model', fakeAsync(() => {

    // Create event to trigger the change of the name field.
    const evt = document.createEvent('Event');
    evt.initEvent('input', true, false);

    // Retrieve the input element.
    const inputElement: DebugElement = fixture.debugElement.query(By.css('#subject'));

    // Add a value to the field and test.
    inputElement.nativeElement.value = 'My Subject';
    inputElement.nativeElement.dispatchEvent(evt);

    fixture.detectChanges();
    tick();

    // Check if the model was updated and the value is valid.
    expect(inputElement.nativeElement.value).toEqual('My Subject');
    expect(component.contactModel.subject).toEqual('My Subject');
    expect(inputElement.classes['ng-valid']).toBeTruthy();

    // Add an empty value and test.
    inputElement.nativeElement.value = '';
    inputElement.nativeElement.dispatchEvent(evt);

    fixture.detectChanges();
    tick();

    // Check if the model was updated and the value is valid.
    expect(inputElement.nativeElement.value).toEqual('');
    expect(component.contactModel.subject).toEqual('');
    expect(inputElement.classes['ng-valid']).toBeFalsy();

  }));

  it('should validate the data in the message field and update the model', fakeAsync(() => {

    // Create event to trigger the change of the name field.
    const evt = document.createEvent('Event');
    evt.initEvent('input', true, false);

    // Retrieve the input element.
    const inputElement: DebugElement = fixture.debugElement.query(By.css('#message'));

    // Add a value to the field and test.
    inputElement.nativeElement.value = 'My Message';
    inputElement.nativeElement.dispatchEvent(evt);

    fixture.detectChanges();
    tick();

    // Check if the model was updated and the value is valid.
    expect(inputElement.nativeElement.value).toEqual('My Message');
    expect(component.contactModel.message).toEqual('My Message');
    expect(inputElement.classes['ng-valid']).toBeTruthy();

    // Add an empty value and test.
    inputElement.nativeElement.value = '';
    inputElement.nativeElement.dispatchEvent(evt);

    fixture.detectChanges();
    tick();

    // Check if the model was updated and the value is valid.
    expect(inputElement.nativeElement.value).toEqual('');
    expect(component.contactModel.message).toEqual('');
    expect(inputElement.classes['ng-valid']).toBeFalsy();

  }));

  it('should enable the submit button if all the data is correct', fakeAsync(() => {

    // Create event to trigger the change of the name field.
    const evt = document.createEvent('Event');
    evt.initEvent('input', true, false);

    fixture.detectChanges();
    tick();

    const submitButton: DebugElement = fixture.debugElement.query(By.css('#submitButton'));
    expect(submitButton.nativeElement.disabled).toBeTruthy();

    // Get elements
    const senderName: DebugElement = fixture.debugElement.query(By.css('#senderName'));
    const senderEmail: DebugElement = fixture.debugElement.query(By.css('#senderEmail'));
    const subject: DebugElement = fixture.debugElement.query(By.css('#subject'));
    const message: DebugElement = fixture.debugElement.query(By.css('#message'));

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

    const fakeModel: Contact = new Contact();
    fakeModel.senderName = 'My name';
    fakeModel.senderEmail = 'my.email@test.com';
    fakeModel.subject = 'Lorem ipsum';
    fakeModel.message = 'Dolor sit amet';

    // Create event to trigger the change of the name field.
    const inputEvt = document.createEvent('Event');
    inputEvt.initEvent('input', true, false);

    const submitButton: DebugElement = fixture.debugElement.query(By.css('#submitButton'));

    // Get elements
    const senderName: DebugElement = fixture.debugElement.query(By.css('#senderName'));
    const senderEmail: DebugElement = fixture.debugElement.query(By.css('#senderEmail'));
    const subject: DebugElement = fixture.debugElement.query(By.css('#subject'));
    const message: DebugElement = fixture.debugElement.query(By.css('#message'));

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

});
