import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  rememberMe: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async login() {

    try {
      let response = await this.authService.loginWithUsernameAndPassword(this.username, this.password);
      this.router.navigate(['/contacts'])
      console.log(response)
    } catch(e) {
      console.log(e);
    }
  }

}
