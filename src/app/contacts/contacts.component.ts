import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from './contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  contactsInitials: string[] = [];


  constructor(private http: HttpClient) {}

  async ngOnInit() {
    let contacts = await this.loadContacts();
    this.contacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
    this.getContactsInitials();

  }

  loadContacts(): Promise<Contact[]> {
    const url = environment.baseUrl + '/contacts/';
    return lastValueFrom(this.http.get<Contact[]>(url));
  }

  getContactsInitials() {
    this.contacts.forEach(contact => {
      this.contactsInitials.push(contact.name.charAt(0))
    })
  }

}
