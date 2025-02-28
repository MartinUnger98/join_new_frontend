import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BackendServicesService } from '../services/backend-services.service';
import { MessageService } from 'primeng/api';
import { Task } from '../add-task/addTask.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  providers: [MessageService],
})
export class BoardComponent implements OnInit, OnDestroy{
  private destroyed$ = new Subject<void>();
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  taskStatuses: string[] = ['To do', 'In progress', 'Await feedback', 'Done'];
  showEmptyTask: boolean = false;
  draggedTask: Task | null = null;
  showDialog: boolean = false;
  openDialog: string = '';
  selectedTaskId:number | null = null;
  searchTerm: string = '';
  isDraggable: boolean = window.innerWidth > 800;

  constructor(
    private cdRef: ChangeDetectorRef,
    private backendService: BackendServicesService,
    private messageService: MessageService,
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isDraggable = event.target.innerWidth > 800;
  }

  async ngOnInit() {
    await this.backendService.loadTasks();
    this.subscribeObservables();
    this.filterTasks();
    window.addEventListener('resize', this.checkScreenSize.bind(this));
  }

  checkScreenSize() {
    this.isDraggable = window.innerWidth > 800;
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkScreenSize.bind(this));
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }


  subscribeObservables() {
    this.backendService.tasks$.pipe(takeUntil(this.destroyed$)).subscribe(tasks => {
      this.tasks = tasks;
      this.filterTasks();
      this.cdRef.detectChanges();
    });
  }


  filterTasks() {
    const term = this.searchTerm.toLowerCase();
    if (term) {
      this.filteredTasks = this.tasks.filter(task =>
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term)
      );
    } else {
      this.filteredTasks = [...this.tasks];
    }
  }

  onSearchTermChange() {
    this.filterTasks();
  }


  tasksExistAtStatus(status: string): boolean {
    return this.filteredTasks && this.filteredTasks.some(task => task.status === status);
  }

  dragStart(task: Task) {
    this.draggedTask = task;
    this.showEmptyTask = true;
  }

  dragEnd() {
    this.draggedTask = null;
    this.showEmptyTask = false;
  }

  async drop(status: string) {
    if (this.draggedTask) {
      const task = this.draggedTask;
      this.dragEnd();
      task.status = status;
      await this.backendService.editTask(task);
    }
  }

  toggleDialog(dialog: string) {
    this.showDialog = true;
    this.openDialog = dialog;
  }


  closeAddTaskDialog(success: boolean = false) {
    this.showDialog = false;
    this.openDialog = '';
    this.selectedTaskId = null;
    if (success) {
      this.messageService.add({ severity:'success', summary: 'Success', detail: this.backendService.toastMessages.successCreatedTask });
    }
  }

  async closeEditTaskDialog(taskid: number, result: { success: boolean, deleteTask?: boolean }) {
    const { success, deleteTask = false } = result;

    this.showDialog = false;
    this.openDialog = '';
    this.selectedTaskId = null;

    if (!success && !deleteTask) {
      let editTask = this.tasks.find(task => task.id === taskid);
      if (editTask) {
        await this.backendService.editTask(editTask);
      }
    }

    if (success && deleteTask) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: this.backendService.toastMessages.successDeletedTask
      });
    }

    if (success && !deleteTask) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: this.backendService.toastMessages.successUpdatedTask
      });
    }
  }

  setSelectedTaskId(id: number) {
    this.selectedTaskId = id;
    this.toggleDialog('task');
  }
}
