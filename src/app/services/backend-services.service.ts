import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../contacts/contact.model';

@Injectable({
  providedIn: 'root'
})
export class BackendServicesService {

  public contactSubject = new BehaviorSubject<Contact[]>([]);
  public contacts$ = this.contactSubject.asObservable();

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
    try {
      await lastValueFrom(this.http.post(url, body));
      await this.loadContacts();
    } catch (error) {
      console.error('Failed to create contact', error);
    }
  }
}
