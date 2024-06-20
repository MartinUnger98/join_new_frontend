import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../contacts/contact.model';

@Injectable({
  providedIn: 'root'
})
export class BackendServicesService {

  public contacts$ = new BehaviorSubject<Contact[]>([]);

  constructor(private http: HttpClient ) { }

  public async loadContacts(): Promise<void> {
    const url = environment.baseUrl + '/contacts/';
    try {
      const contacts = await lastValueFrom(this.http.get<Contact[]>(url));
      this.contacts$.next(contacts.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error('Failed to load contacts', error);
    }
  }

  public createContact(name:string, email:string, phone:string, bg_color: string) {
    const url = environment.baseUrl + '/contacts/';
    const body = {
      "name": name,
      "email": email,
      "phone": phone,
      "bg_color": bg_color
    }
    return lastValueFrom(this.http.post(url,body));
  }
}
