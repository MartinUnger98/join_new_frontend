import { Component, OnInit, forwardRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import Validation from './password-match.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  signUpForm: FormGroup = new FormGroup( {
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  })
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

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

  onSubmit() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      console.log('invalid')
      return;
    }
    console.log(JSON.stringify(this.signUpForm.value, null, 2));
  }

  onReset(): void {
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
