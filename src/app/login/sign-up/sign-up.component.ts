import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  rememberMe: boolean = false;
  username: string = '';
  password: string = '';
  confirm_password: string = '';
  email: string = '';

  toggleVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirm_password') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

}
