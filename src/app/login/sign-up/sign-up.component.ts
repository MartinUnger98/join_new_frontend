import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = '';
  rememberMe: boolean = false;

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  toggleVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirm_password') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}
