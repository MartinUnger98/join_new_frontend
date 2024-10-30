import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../add-task/addTask.model';
import { Subject, takeUntil } from 'rxjs';
import { BackendServicesService } from '../services/backend-services.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  tasks: Task[] = [];
  todoCount: number = 0;
  doneCount: number = 0;
  urgentTaskCount: number = 0;
  inProgressCount: number = 0;
  awaitingFeedbackCount: number = 0;
  totalTaskCount: number = 0;
  upcomingDeadline: string | null = null;
  loggedInUser: string = '';
  greet: string = '';

  constructor(private backendService: BackendServicesService) {}

  async ngOnInit() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      this.loggedInUser = loggedInUser;
    }
    this.setGreetMessage();
    await this.backendService.loadTasks();
    this.subscribeObservables();
  }

  subscribeObservables() {
    this.backendService.tasks$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((tasks) => {
        this.tasks = tasks;
        this.calculateTaskMetrics();
      });
  }

  setGreetMessage() {
    const hour = new Date().getHours();
    this.greet = hour < 12 ? 'Good morning,' : hour < 18 ? 'Good afternoon,' : 'Good evening,';
  }


  calculateTaskMetrics() {
    this.todoCount = this.getTaskCount('To do');
    this.doneCount = this.getTaskCount('Done');
    this.urgentTaskCount = this.getTaskCount(undefined, 'Urgent');
    this.inProgressCount = this.getTaskCount('In progress');
    this.awaitingFeedbackCount = this.getTaskCount('Await feedback');
    this.totalTaskCount = this.getTaskCount();

    const urgentTasks = this.tasks
      .filter((task) => task.priority === 'Urgent' && task.dueDate)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    this.upcomingDeadline = urgentTasks.length ? urgentTasks[0].dueDate : null;
  }

  getTaskCount(status?: string, priority?: string): number {
    let filteredTasks = this.tasks;

    if (status) {
      filteredTasks = filteredTasks.filter(
        (task) => task.status.toLowerCase() === status.toLowerCase()
      );
    }

    if (priority) {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority.toLowerCase() === priority.toLowerCase()
      );
    }

    return filteredTasks.length;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
