import { ChangeDetectorRef, Component } from '@angular/core';
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
export class BoardComponent {
  private destroyed$ = new Subject<void>();
  tasks: Task[] = [];
  taskStatuses: string[] = ['To do', 'In progress', 'Await feedback', 'Done'];
  showEmptyTask: boolean = false;
  draggedTask: Task | null = null;
  showDialog: boolean = false;
  openDialog: string = '';
  selectedTaskId:number | null = null;

  constructor(
    private cdRef: ChangeDetectorRef,
    private backendService: BackendServicesService,
    private messageService: MessageService,
  ) { }

  async ngOnInit() {
    await this.backendService.loadTasks();
    this.subscribeObservables();


  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }


  subscribeObservables() {
    this.backendService.tasks$.pipe(takeUntil(this.destroyed$)).subscribe(tasks => {
      this.tasks = tasks;
      this.cdRef.detectChanges();
    });
  }

  tasksExistAtStatus(status: string): boolean {
    return this.tasks && this.tasks.some(task => task.status === status);
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
      this.messageService.add({ severity:'success', summary: 'Success', detail: 'You have successfully added a task!' });
    }
  }

  async closeEditTaskDialog(taskid: number, success: boolean = false, deleteTask: boolean = false) {
    this.showDialog = false;
    this.openDialog = '';
    this.selectedTaskId = null;
    if (!deleteTask) {
        let editTask = this.tasks.find(task => task.id === taskid);
        if (editTask) {
            await this.backendService.editTask(editTask);
        }
    }
    if (success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'You have successfully deleted a task!' });
    }
}




  setSelectedTaskId(id: number) {
    this.selectedTaskId = id;
    this.toggleDialog('task');
  }
}
