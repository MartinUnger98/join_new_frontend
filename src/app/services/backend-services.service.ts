import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendServicesService {

  constructor(private http: HttpClient ) { }

  public createContact(name:string, email:string, phone:string) {
    const url = environment.baseUrl + '/contacts/';
    const body = {
      "name": name,
      "email": email,
      "phone": phone
    }
    return lastValueFrom(this.http.post(url,body));
  }
}
