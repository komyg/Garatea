import { Component, OnInit } from '@angular/core';

import { ContactService } from '../shared/service/contact.service';
import { Contact } from '../shared/model/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public contactModel: Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactModel = new Contact();
  }

  public onSubmit() {
    this.contactService.sendContactData(this.contactModel);
  }

}
