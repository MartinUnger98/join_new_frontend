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
import { BgColorsService } from '../services/bg-colors.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  providers: [MessageService]
})
export class ContactsComponent implements OnInit, AfterViewInit {
  contacts: Contact[] = [];
  contactsInitials: string[] = [];
  bgColorsAvatar: string[] = [];
  visible: boolean = false;
  newContactName: string = '';
  newContactEmail: string = '';
  newContactPhone: string = '';

  constructor(
    private http: HttpClient,
    private bgColorService: BgColorsService,
    private cdRef: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    this.bgColorsAvatar = this.bgColorService.bgColors;
    let contacts = await this.loadContacts();
    this.contacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
    this.getContactsInitials();
    this.setContactColors();
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

  getBgColorForAvatar() {
    return this.bgColorsAvatar[
      Math.floor(Math.random() * this.bgColorsAvatar.length)
    ];
  }

  setContactColors() {
    this.contacts.forEach((contact) => {
      contact['bgColor'] = this.getBgColorForAvatar();
    });
  }

  getInitialsForAvatar(contact: string) {
    let nameParts = contact.split(' ');
    let initials = nameParts.slice(0, 2).map((part) => part[0].toUpperCase());
    return initials.join('');
  }

  toggleDialog() {
    this.visible = !this.visible;
  }

  createContact() {
    console.log("account created")
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'You have successfully logged in!' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid username or password' });
  }
}
