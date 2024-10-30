import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public loginWithUsernameAndPassword(username: string, password: string) {
    const url = environment.baseUrl + '/login/';
    const body = {
      "username": username,
      "password": password,
    }
    return lastValueFrom(this.http.post(url, body));
  }

  public registerUser(username: string, password: string, email: string) {
    const url = environment.baseUrl + '/register/';
    const body = {
      "username": username,
      "password": password,
      "email": email
    }
    return lastValueFrom(this.http.post(url, body));
  }

  public guestLogin() {
    const url = environment.baseUrl + '/guest_login/';
    return lastValueFrom(this.http.post(url, {}));
  }
}
