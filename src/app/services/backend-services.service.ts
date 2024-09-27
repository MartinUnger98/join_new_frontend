import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../contacts/contact.model';
import { Task, Subtask } from '../add-task/addTask.model';

@Injectable({
  providedIn: 'root'
})
export class BackendServicesService {

  public contactSubject = new BehaviorSubject<Contact[]>([]);
  public contacts$ = this.contactSubject.asObservable();

  public tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  public toastMessages = {
    successCreatedTask: "You have successfully created a task!",
    successUpdatedTask: "You have successfully updated a task!",
    successDeletedTask: "You have successfully deleted a task!",
    successCreatedContact: "You have successfully added a contact!",
    successUpdatedContact: "You have successfully updated a contact!",
    successDeletedContact: "You have successfully deleted a contact!",
    successLogin: "You have successfully logged in!",
    errorLogin: "Invalid username or password!",
    errorDeleteContact: "An error occurred while deleting!",
    rejected: "You have rejected!",
    successCreatedAccount: "Your account has been created successfully!",
    errorUnexpected: "An unexpected error occurred!",
    errorUpdatingContact: "Updating your contact has failed!",
    errorCreatingContact: "Creating your contact has failed!"
  }

  constructor(private http: HttpClient ) { }

  public async loadContacts(): Promise<void> {
    const url = environment.baseUrl + '/contacts/';
    try {
      const contacts = await lastValueFrom(this.http.get<Contact[]>(url));
      this.contactSubject.next(contacts.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error('Failed to load contacts', error);
    }
  }

  public async createContact(name: string, email: string, phone: string, bg_color: string): Promise<void> {
    const url = environment.baseUrl + '/contacts/';
    const body = {
      "name": name,
      "email": email,
      "phone": phone,
      "bg_color": bg_color
    };

    await lastValueFrom(this.http.post(url, body));
    await this.loadContacts();
  }

  public async editContact(name: string, email: string, phone: string, id:number) {
    const url = environment.baseUrl + `/contacts/${id}/`;
    const body = {
      "name": name,
      "email": email,
      "phone": phone
    };

    await lastValueFrom(this.http.put(url, body));
    await this.loadContacts();
  }

  public async deleteContact(id:number) {
    const url = environment.baseUrl + `/contacts/${id}/`;
    await lastValueFrom(this.http.delete(url));
    await this.loadContacts();
  }

  public async loadTasks() {
    const url = environment.baseUrl + '/tasks/';
    const tasks = await lastValueFrom(this.http.get<Task[]>(url));
    this.tasksSubject.next(tasks);
  }

  public async createTask(task: Task) {
      const url = environment.baseUrl + '/tasks/';
      const body: Task = {
        "title": task.title,
        "description": task.description,
        "assignedTo": task.assignedTo,
        "dueDate": task.dueDate,
        "priority": task.priority,
        "category": task.category,
        "status": task.status
    };

    if (task.subtasks && task.subtasks.length > 0) {
      body.subtasks = task.subtasks;
    }
    await lastValueFrom(this.http.post(url, body));
    await this.loadTasks();
  }

  public async editTask(task:Task) {
    const url = environment.baseUrl + `/tasks/${task.id}/`;
    const body:Task = {
      "title": task.title,
      "description": task.description,
      "assignedTo": task.assignedTo,
      "dueDate": task.dueDate,
      "priority": task.priority,
      "category": task.category,
      "status": task.status
    };

    if (task.subtasks && task.subtasks.length > 0) {
      body.subtasks = task.subtasks;
    }
    await lastValueFrom(this.http.put(url, body));
    await this.loadTasks();
  }

  public async deleteTask(id: number): Promise<void> {
    const url = environment.baseUrl + `/tasks/${id}/`;
    await lastValueFrom(this.http.delete(url));
    await this.loadTasks();
}

}
