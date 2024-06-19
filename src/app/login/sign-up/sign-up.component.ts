import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from './password-match.validator';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [MessageService]
})
export class SignUpComponent implements OnInit {
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isLoading: boolean = false;

  signUpForm: FormGroup = new FormGroup( {
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  })

  constructor(private formBuilder: FormBuilder, public authService: AuthService, private messageService: MessageService, private router: Router) {}


  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group(
      {
        username: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signUpForm.controls;
  }

  async onSubmit() {
    let signUpJson = this.signUpForm.value;
    try {
      await this.registerUser(signUpJson);
    } catch (error) {
      this.setToastErrorMessage(error);
    }
  }

  async registerUser(signUpJson: any) {
    this.isLoading = true;
    await this.authService.registerUser(signUpJson.username, signUpJson.password, signUpJson.email);
    this.isLoading = false;
    this.showSuccess();
    setTimeout(() => {
      this.router.navigate(["/login"])
      this.resetForm();
    }, 3000);
  }

  setToastErrorMessage(error: any) {
    this.isLoading = false;
    if (error.status === 400 && error.error.username) {
      this.messageService.add({ severity: 'error', summary: 'Registration Failed', detail: error.error.username[0] });
    } else if(error.status === 400 && error.error.email) {
      this.messageService.add({ severity: 'error', summary: 'Registration Failed', detail: error.error.email[0] });
    } else {
      this.showError();
    }
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your account has been created successfully!' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An unexpected error occurred!' });
  }

  resetForm(): void {
    this.signUpForm.reset();
  }

  toggleVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirm_password') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}

