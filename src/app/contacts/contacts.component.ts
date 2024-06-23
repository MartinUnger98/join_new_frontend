import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Contact } from './contact.model';
import { MessageService } from 'primeng/api';
import { BackendServicesService } from '../services/backend-services.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  providers: [MessageService],
})
export class ContactsComponent implements OnInit, AfterViewInit, OnDestroy {
  contacts: Contact[] = [];
  contactsInitials: string[] = [];
  showDialog: boolean = false;
  isEditMode: boolean = false;
  selectedContact: Contact | null = null;
  private destroyed$ = new Subject<void>();

  constructor(
    private cdRef: ChangeDetectorRef,
    private messageService: MessageService,
    private backendService: BackendServicesService
  ) {}

  async ngOnInit() {
    this.subscribeObservables();
    await this.backendService.loadContacts();
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  subscribeObservables() {
    this.backendService.contacts$.pipe(takeUntil(this.destroyed$)).subscribe(contacts => {
      this.contacts = contacts;
      this.getContactsInitials();
      this.cdRef.detectChanges();
    });
  }


  getContactsInitials() {
    this.contactsInitials = [];
    this.contacts.forEach((contact) => {
      const initial = contact.name[0].toUpperCase();
      if (!this.contactsInitials.includes(initial)) {
        this.contactsInitials.push(initial);
      }
    });
  }


  getInitialsForAvatar(contact: string) {
    let nameParts = contact.split(' ');
    let initials = nameParts.slice(0, 2).map((part) => part[0].toUpperCase());
    return initials.join('');
  }

  deleteContact(id:number) {
    this.backendService.deleteContact(id);
  }


  toggleDialog(isEdit: boolean = false, contact: Contact | null = null) {
    this.isEditMode = isEdit;
    this.selectedContact = contact;
    this.showDialog = true;
  }

  closeDialog(success: boolean) {
    this.showDialog = false;
    if (success) {
      this.showSuccess(this.isEditMode ? 'Contact updated successfully!' : 'You have successfully added a contact!');
    }
  }

  showSuccess(detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: detail,
    });
  }

  showContactDetails(contact: Contact) {
    this.selectedContact = contact
  }


  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
