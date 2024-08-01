import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { Task } from 'src/app/add-task/addTask.model';
import { Contact } from 'src/app/contacts/contact.model';
import { BackendServicesService } from 'src/app/services/backend-services.service';

@Component({
  selector: 'app-card-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.scss',
  providers: [MessageService],
})
export class CardTaskComponent {
  @Input() task: Task | null = null;

  contacts: Contact[] = [];
  private destroyed$ = new Subject<void>();

  constructor(
    private cdRef: ChangeDetectorRef,
    private backendService: BackendServicesService,
  ) {}

  async ngOnInit() {
    await this.backendService.loadContacts();
    this.subscribeObservables();
  }

  subscribeObservables() {
    this.backendService.contacts$.pipe(takeUntil(this.destroyed$)).subscribe(contacts => {
      this.contacts = contacts;
      this.cdRef.detectChanges();
    });
  }

  getContactNameById(id: number): string {
    const contact = this.contacts.find(c => c.id === id);
    return contact ? this.getInitialsForAvatar(contact.name) : 'Unknown';

  }

  getInitialsForAvatar(contactName: string) {
    let nameParts = contactName.split(' ');
    let initials = nameParts.slice(0, 2).map((part) => part[0].toUpperCase());
    return initials.join('');
  }


  getPrioIcon(prio: string) {
    switch (prio) {
      case 'Low':
        return 'pi-angle-double-down prio-3';
      case 'Medium':
        return 'pi pi-equals prio-2';
      default:
        return 'pi-angle-double-up prio-1';
    }
  }


}
