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

  private sendButtonText: string;
  private sendingEmail: boolean;

  // E-mail sending stauts.
  private statusSent: boolean;
  private statusError: boolean;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactModel = new Contact();
    this.contactModel.type = 0;

    this.sendButtonText = 'Enviar';
    this.sendingEmail = false;

    this.statusSent = false;
    this.statusError = false;
  }

  public onSubmit() {
    this.statusSent = false;
    this.statusError = false;

    this.sendButtonText = 'Enviando';
    this.sendingEmail = true;

    this.contactService.sendContactData(this.contactModel).subscribe(this.emailSuccess.bind(this), this.emailError.bind(this));
  }

  private emailSuccess() {
    this.sendButtonText = 'Enviar';
    this.sendingEmail = false;

    this.statusSent = true;
    this.statusError = false;
  }

  private emailError() {
    this.sendButtonText = 'Enviar';
    this.sendingEmail = false;

    this.statusSent = false;
    this.statusError = true;
  }

}
