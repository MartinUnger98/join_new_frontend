import { Component } from '@angular/core';


@Component({
  selector: 'app-login',
  standalone: false,
  /* imports: [], */
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showPassword: boolean = false;
  rememberMe: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
