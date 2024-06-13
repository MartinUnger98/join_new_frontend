import { Component, OnInit, forwardRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
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
  submitted = false;

  constructor(private formBuilder: FormBuilder, public authService: AuthService, private messageService: MessageService, private router: Router) {}


  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(40)
          ]
        ],
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
    this.submitted = true;
    let signUpJson = this.signUpForm.value;
    try {
      this.isLoading = true;
      await this.authService.registerUser(signUpJson.username, signUpJson.password, signUpJson.email);
      this.isLoading = false;
      this.showSuccess();
      setTimeout(() => {
        this.router.navigate(["/login"])
        this.resetForm();
      }, 3000);
    } catch (error:any) {
      this.isLoading = false;
      this.showError();
      console.error('Error during registration', error);
      console.error('Error details:', error.error);
    }
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'You' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
  }

  resetForm(): void {
    this.submitted = false;
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
