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
  taskStatuses: string[] = ['To do', 'In Progress', 'Await feedback', 'Done'];
  showEmptyTask: boolean = false;
  draggedTaskId: number | null = null;

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

  dragStart(taskId: number) {
    this.draggedTaskId = taskId;
    this.showEmptyTask = true;
  }

  dragEnd() {
    this.draggedTaskId = null;
    this.showEmptyTask = false;
  }
}
