import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Contact } from '../contacts/contact.model';
import { BackendServicesService } from '../services/backend-services.service';
import { MessageService } from 'primeng/api';
import { PrioOption, Category, Task } from './addTask.model';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
  providers: [MessageService],
})
export class AddTaskComponent implements OnInit, AfterViewInit, OnDestroy{
  @Input() isInDialog: boolean = false;
  @Input() editingTask: Task | null = null;
  @Output() close = new EventEmitter<{ success: boolean; deleteTask: boolean } | boolean>();


  contacts: Contact[] = [];
  contactsInitials: string[] = [];
  showDialog: boolean = false;
  private destroyed$ = new Subject<void>();

  addTaskForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    assigned_to: new FormControl(''),
    due_date: new FormControl(''),
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
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    await this.backendService.loadContacts();
    this.subscribeObservables();
    this.addTaskForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required],
        assigned_to: ['', Validators.required],
        due_date: ['', Validators.required],
        priority: ['', Validators.required],
        category: ['', Validators.required],
        subtasks: ['',],
      }
    )
    if (this.editingTask) {
      this.fillFormWithExistingTask(this.editingTask);
    }
  }

  fillFormWithExistingTask(task: Task) {
    this.addTaskForm.patchValue({
      title: task.title,
      description: task.description,
      assigned_to: task.assigned_to.map((id) => this.contacts.find((c) => c.id === id)),
      due_date: task.due_date,
      priority: task.priority,
      category: this.categories.find((c) => c.name === task.category),
      subtasks: '',
    });
    if(task.subtasks){
      this.subTasks = task.subtasks.map(subtask => ({
        value: subtask.value,
        done: subtask.done,
        edit: false,
      }));
    }
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

  async onSubmit() {
    if (this.addTaskForm.valid) {
      const task: Task = {
        title: this.addTaskForm.value.title,
        description: this.addTaskForm.value.description,
        assigned_to: this.addTaskForm.value.assigned_to.map((contact: Contact) => contact.id),
        due_date: this.addTaskForm.value.due_date,
        priority: this.addTaskForm.value.priority,
        category: this.addTaskForm.value.category.name,
        subtasks: this.subTasks,
        status: this.editingTask ? this.editingTask.status : 'To do'
      };
      try {
        if (!this.editingTask) {
          await this.createTask(task);
          this.close.emit(true);
        } else {
          task.id = this.editingTask.id
          await this.updateTask(task);
          this.close.emit({ success: true, deleteTask: false });
        }

      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.backendService.toastMessages.errorUnexpected,
        });
      }
    }
  }

  async createTask(task: Task) {
    await this.backendService.createTask(task);
    this.messageService.add({ severity:'success', summary: 'Success', detail: this.backendService.toastMessages.successCreatedTask });
    this.clearAllInputs();
  }

  async updateTask(task: Task) {
    await this.backendService.editTask(task);
  }

  toggleDialog() {
    this.showDialog = true;
  }

  closeContactDialog(result: Contact | boolean | null) {
    this.showDialog = false;

    if (result === true) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: this.backendService.toastMessages.successCreatedContact
      });
    }

    if (typeof result === 'object' && result !== null) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: this.backendService.toastMessages.successCreatedContact
      });
    }
  }



  clearAllInputs() {
    this.addTaskForm.reset();
    this.subTasks = [];
  }
}
