import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BackendServicesService } from '../services/backend-services.service';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})

export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  rememberMe: boolean = false;
  isLoading: boolean = false;
  guestname: string = '';
  guestpassword: string = '';
  showContent: boolean = false;
  showLogo: boolean = true

  constructor(
    public authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private backendService: BackendServicesService
  ) {}

  ngOnInit() {
    const encryptedUsername = localStorage.getItem('rememberedUsername');
    if (encryptedUsername) {
      this.username = CryptoJS.AES.decrypt(encryptedUsername, 'your-secret-key').toString(CryptoJS.enc.Utf8);
      this.rememberMe = true;
    }
    setTimeout(() => {
      this.showContent = true;
      this.showLogo = false;
    }, 3000);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async login(guestLogin: boolean = false, event: Event) {
    try {
      this.isLoading = true;
      let response = null;
      if (!guestLogin) {
        response = await this.authService.loginWithUsernameAndPassword(this.username, this.password);
      } else {
        event.preventDefault();
        response = await this.authService.guestLogin();
      }
      this.loginProcess(response);
    } catch(error) {
      this.isLoading = false;
      this.showError();
    }
  }

  loginProcess(response: any) {
    localStorage.setItem('token', response['token']);
    localStorage.setItem('loggedInUser', response['name']);
    if (this.rememberMe) {
      const encryptedUsername = CryptoJS.AES.encrypt(this.username, 'your-secret-key').toString();
      localStorage.setItem('rememberedUsername', encryptedUsername);
    } else {
      localStorage.removeItem('rememberedUsername');
    }
    this.showSuccess();
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/summary'])
    }, 3000);
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: this.backendService.toastMessages.successLogin });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: this.backendService.toastMessages.errorLogin });
  }

}
