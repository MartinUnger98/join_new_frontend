import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { Subtask, Task } from 'src/app/add-task/addTask.model';
import { Contact } from 'src/app/contacts/contact.model';
import { BackendServicesService } from 'src/app/services/backend-services.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-card-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProgressBarModule,
    ButtonModule
  ],
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.scss',
  providers: [MessageService],
})
export class CardTaskComponent {
  @Input() taskId: number | null = null;
  @Input() movedTask!: Task;
  @Output() moveTaskUp = new EventEmitter<Task>();
  @Output() moveTaskDown = new EventEmitter<Task>();
  task: Task | null = null;

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


  getContactNameById(id: number): string {
    const contact = this.contacts.find(c => c.id === id);
    return contact ? this.getInitialsForAvatar(contact.name) : 'Unknown';
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

  moveUp() {
    this.moveTaskUp.emit(this.movedTask);
  }

  moveDown() {
    this.moveTaskDown.emit(this.movedTask);
  }
}
