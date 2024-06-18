import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  rememberMe: boolean = false;

  constructor(public authService: AuthService, private router: Router, private messageService: MessageService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async login() {
    try {
      let response: any = await this.authService.loginWithUsernameAndPassword(this.username, this.password);
      localStorage.setItem('token', response['token'])
      this.showSuccess();
      setTimeout(() => {
        this.router.navigate(['/contacts'])
      }, 3000);


    } catch(e) {
      this.showError();
    }
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'You have successfully logged in!' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid username or password' });
  }

}
