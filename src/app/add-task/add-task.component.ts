import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Contact } from '../contacts/contact.model';
import { BackendServicesService } from '../services/backend-services.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent implements OnInit{
  addTaskForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    assignedTo: new FormControl(''),
    dueDate: new FormControl(''),
    priority: new FormControl(''),
    category: new FormControl(''),
  });

  contacts: Contact[] = [];
  contactsInitials: string[] = [];
  private destroyed$ = new Subject<void>();


  constructor(
    private cdRef: ChangeDetectorRef,
    private backendService: BackendServicesService,
  ) {}

  async ngOnInit() {
    this.subscribeObservables();
    await this.backendService.loadContacts();
  }

  subscribeObservables() {
    this.backendService.contacts$.pipe(takeUntil(this.destroyed$)).subscribe(contacts => {
      this.contacts = contacts;
      this.cdRef.detectChanges();
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.addTaskForm.controls;
  }

  getInitialsForAvatar(contactName: string) {
    let nameParts = contactName.split(' ');
    let initials = nameParts.slice(0, 2).map((part) => part[0].toUpperCase());
    return initials.join('');
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
