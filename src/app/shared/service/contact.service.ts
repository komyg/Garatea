import { Injectable } from '@angular/core';

import { Contact } from '../model/contact.model';

@Injectable()
export class ContactService {

  constructor() { }

  /**
   * Sends the contact data via HTTP POST to the backend, where it will be
   * processed and sent as an e-mail.
   */
  sendContactData(data: Contact) {
    console.log('Send contact data');
  }

}
