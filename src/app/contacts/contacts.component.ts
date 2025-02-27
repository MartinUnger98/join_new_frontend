import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Contact } from './contact.model';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BackendServicesService } from '../services/backend-services.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ContactsComponent implements OnInit, AfterViewInit, OnDestroy {
  contacts: Contact[] = [];
  contactsInitials: string[] = [];
  showDialog: boolean = false;
  isEditMode: boolean = false;
  selectedContact: Contact | null = null;
  showArticleContacts: boolean = true;
  showArticleDetails: boolean = false;
  private destroyed$ = new Subject<void>();
  private resizeListener!: () => void;
  isMobileView: boolean = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    private messageService: MessageService,
    private backendService: BackendServicesService,
    private confirmationService: ConfirmationService,
  ) {}

  async ngOnInit() {
    await this.backendService.loadContacts();
    this.subscribeObservables();
    this.updateView();
    this.resizeListener = () => this.handleResize();
    window.addEventListener('resize', this.resizeListener);
  }

  updateView() {
    if (window.innerWidth > 1320) {
      this.showArticleContacts = true;
      this.showArticleDetails = true;
    } else {
      this.showArticleContacts = true;
      this.showArticleDetails = false;
    }
  }

  handleResize() {
    const isNowMobile = window.innerWidth < 1320;

    if (!this.isMobileView && isNowMobile) {
      this.showArticleContacts = true;
      this.showArticleDetails = false;
    } else if (this.isMobileView && !isNowMobile) {
      this.showArticleContacts = true;
      this.showArticleDetails = true;
    }

    this.isMobileView = isNowMobile;
  }

  toggleView(view: number) {
    if (this.isMobileView) {
      this.showArticleContacts = view === 1;
      this.showArticleDetails = view === 0;
    }
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


  getInitialsForAvatar(contactName: string) {
    let nameParts = contactName.split(' ');
    let initials = nameParts.slice(0, 2).map((part) => part[0].toUpperCase());
    return initials.join('');
  }

  async deleteContact(id:number) {
    try {
      await this.backendService.deleteContact(id);
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.backendService.toastMessages.errorDeleteContact });
    }
  }


  toggleDialog(isEdit: boolean = false, contact: Contact | null = null) {
    this.isEditMode = isEdit;
    this.selectedContact = contact;
    this.showDialog = true;
  }

  closeDialog(success: boolean) {
    this.showDialog = false;
    if (success) {
      this.showSuccess(this.isEditMode ? this.backendService.toastMessages.successUpdatedContact : this.backendService.toastMessages.successCreatedContact);
      this.selectedContact = null;
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
    this.toggleView(0);
    this.selectedContact = contact
  }

  openDeleteDialog(event: Event, contactId: number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure to delete this contact?',
        header: 'Delete Contact',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: async() => {
          await this.deleteContact(contactId);
          this.selectedContact = null;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: this.backendService.toastMessages.successDeletedContact });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: this.backendService.toastMessages.rejected });
        }
    });
  }


  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
