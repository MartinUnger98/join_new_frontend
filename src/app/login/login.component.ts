import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: false,
  /* imports: [], */
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  rememberMe: boolean = false;

  constructor(public AuthService: AuthService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async login() {

    try {
      let response = await this.AuthService.loginWithUsernameAndPassword(this.username, this.password);
      console.log(response)
    } catch(e) {
      console.log(e);
    }
  }


}
