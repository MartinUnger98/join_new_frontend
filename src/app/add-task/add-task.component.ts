import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Contact } from '../contacts/contact.model';
import { BackendServicesService } from '../services/backend-services.service';
import { MessageService } from 'primeng/api';
import { PrioOption, Category } from './addTask.model';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
  providers: [MessageService],
})
export class AddTaskComponent implements OnInit, AfterViewInit, OnDestroy{
  contacts: Contact[] = [];
  contactsInitials: string[] = [];
  showDialog: boolean = false;
  private destroyed$ = new Subject<void>();

  addTaskForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    assignedTo: new FormControl(''),
    dueDate: new FormControl(''),
    priority: new FormControl(''),
    category: new FormControl(''),
    subtasks: new FormControl(''),
  });

  prioOptions: PrioOption[] = [
    { priority: 'Urgent', value: 'Urgent', icon: 'pi pi-angle-double-up text-xl prio-1', class: 'prio-1'},
    { priority: 'Medium', value: 'Medium', icon: 'pi pi-equals text-xl prio-2', class: 'prio-2' },
    { priority: 'Low', value: 'Low', icon: 'pi pi-angle-double-down text-xl prio-3', class: 'prio-3' },
  ];

  categories: Category[] = [
    { name: 'Technical Task'},
    { name: 'User Story'},
    { name: 'Bug'},
  ];

  isFocused: boolean = false;
  subTasks: any[]  = [];
  @ViewChild('inputFieldSubtask') inputField!: ElementRef;
  @ViewChild('inputFieldEditSubtask') inputFieldEdit!: ElementRef;


  constructor(
    private cdRef: ChangeDetectorRef,
    private backendService: BackendServicesService,
    private messageService: MessageService,
  ) {}

  async ngOnInit() {
    this.subscribeObservables();
    await this.backendService.loadContacts();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
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

  toggleDialog() {
    this.showDialog = true;
  }

  closeDialog(success: boolean) {
    this.showDialog = false;
    if (success) {
      this.messageService.add({ severity:'success', summary: 'Success', detail: 'You have successfully added a contact!' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
    }
  }

  onFocusSubtask() {
    this.isFocused = true;
  }
  onBlurSubtask() {
    if (this.inputField.nativeElement.value.trim() === '') {
      this.isFocused = false;
    }
  }

  focusSubtaskInput() {
    this.inputField.nativeElement.focus();
  }

  addSubtask() {
    let value = this.inputField.nativeElement.value.trim()
    if (value !== '') {
      this.subTasks.push({
        value: value,
        edit: false
      });
      this.clearSubtaskInput();

    }
  }

  clearSubtaskInput() {
    this.inputField.nativeElement.value = '';
    this.isFocused = false;
  }


  deleteSubtask(subTask: string | number) {
    let index = this.subTasks.indexOf(subTask);
    this.subTasks.splice(index, 1);
  }

  changeToEditSubtask(subTask: string | number) {
    let index = this.subTasks.indexOf(subTask);
    this.subTasks[index].edit = true;
  }

  editSubtask(subTask: string | number) {
    let index = this.subTasks.indexOf(subTask);
    let editValue = this.inputFieldEdit.nativeElement.value;
    if (editValue !== '') {
      this.subTasks[index].value = editValue;
    }
    this.subTasks[index].edit = false;
  }
}
