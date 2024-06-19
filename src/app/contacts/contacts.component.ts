import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from './contact.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  providers: [MessageService],
})
export class ContactsComponent implements OnInit, AfterViewInit {
  contacts: Contact[] = [];
  contactsInitials: string[] = [];
  showDialog: boolean = false;
  selectedContact: Contact | null = null;

  constructor(
    private http: HttpClient,
    private cdRef: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    let contacts = await this.loadContacts();
    this.contacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
    this.getContactsInitials();
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  loadContacts(): Promise<Contact[]> {
    const url = environment.baseUrl + '/contacts/';
    return lastValueFrom(this.http.get<Contact[]>(url));
  }

  getContactsInitials() {
    this.contacts.forEach((contact) => {
      if (!this.contactsInitials.includes(contact.name[0])) {
        this.contactsInitials.push(contact.name[0]);
      }
    });
  }



  getInitialsForAvatar(contact: string) {
    let nameParts = contact.split(' ');
    let initials = nameParts.slice(0, 2).map((part) => part[0].toUpperCase());
    return initials.join('');
  }

  toggleDialog() {
    this.showDialog = true;
  }

  closeDialog(success: boolean) {
    this.showDialog = false;
    if (success) {
      this.showSuccess();
    }
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'You have successfully added a contact!',
    });
  }

  showContactDetails(contact: Contact) {
    this.selectedContact = contact
    console.log(contact);

  }
}
