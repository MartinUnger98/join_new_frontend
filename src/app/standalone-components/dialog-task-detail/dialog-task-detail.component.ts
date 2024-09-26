import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Subtask, Task } from 'src/app/add-task/addTask.model';
import { Contact } from 'src/app/contacts/contact.model';
import { BackendServicesService } from 'src/app/services/backend-services.service';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-dialog-task-detail',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    CheckboxModule,
    ButtonModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './dialog-task-detail.component.html',
  styleUrl: './dialog-task-detail.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class DialogTaskDetailComponent implements OnInit, OnDestroy{
  @Input() taskId: number | null = null;
  @Output() close = new EventEmitter<boolean>();
  task: Task | null = null;
  checked: boolean = false;

  contacts: Contact[] = [];
  visible: boolean = true;
  private destroyed$ = new Subject<void>();

  constructor(
    private cdRef: ChangeDetectorRef,
    private backendService: BackendServicesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    await this.backendService.loadContacts();
    this.subscribeObservables();
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  subscribeObservables() {
    this.backendService.contacts$.pipe(takeUntil(this.destroyed$)).subscribe(contacts => {
      this.contacts = contacts;
      this.cdRef.detectChanges();
    });

    this.backendService.tasks$.pipe(takeUntil(this.destroyed$)).subscribe(tasks => {
      if (this.taskId !== null) {
        this.task = tasks.find(task => task.id === this.taskId) || null;
        this.cdRef.detectChanges();
      }
    });
  }


  getContactNameById(id: number, initials: boolean = true): string {
    const contact = this.contacts.find(c => c.id === id);
    if (initials) {
      return contact ? this.getInitialsForAvatar(contact.name) : 'Unknown';
    } else {
      return contact ? contact.name : 'Unknown';
    }

  }

  getInitialsForAvatar(contactName: string) {
    let nameParts = contactName.split(' ');
    let initials = nameParts.slice(0, 2).map((part) => part[0].toUpperCase());
    return initials.join('');
  }

  getContactBgColor(id: number) {
    const contact = this.contacts.find(c => c.id === id);
    return contact ? contact.bg_color : 'white';
  }


  getPrioIcon(prio: string): string {
    switch (prio) {
      case 'Low':
        return 'pi-angle-double-down prio-3';
      case 'Medium':
        return 'pi pi-equals prio-2';
      case 'Urgent':
        return 'pi-angle-double-up prio-1';
      default:
        return '';
    }
  }

  getCategoryBg(category: string): string {
    switch (category) {
      case 'Technical Task':
        return 'bg-category-1';
      case 'User Story':
        return 'bg-category-2';
      case 'Bug':
        return 'bg-category-3';
      default :
        return 'bg-gray-500';
    }
  }

  getProgressbarValue(subtasks: Subtask[], returnAsPercentage: boolean = false) {
    let count = 0;
    subtasks.forEach(subtask => {
      if (subtask.done) {
        count++;
      }
    });
    if (returnAsPercentage) {
      return (count / subtasks.length) * 100;
    }
    return count;
  }

  closeDialog(success: boolean = false) {
    this.close.emit(success);
  }


  deleteTask() {
    if (this.taskId) {
        this.backendService.deleteTask(this.taskId).then(() => {
            this.closeDialog(true);
        });
    }
  }


  openDeleteDialog(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure to delete this task?',
        header: 'Delete Task',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: async() => {
          this.deleteTask();
        },
        reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        }
    });
  }


  ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
  }
}
