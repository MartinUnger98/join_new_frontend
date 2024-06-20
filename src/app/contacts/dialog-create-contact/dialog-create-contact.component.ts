import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Contact } from '../contact.model';
import { BackendServicesService } from 'src/app/services/backend-services.service';

@Component({
  selector: 'app-dialog-create-contact',
  templateUrl: './dialog-create-contact.component.html',
  styleUrl: './dialog-create-contact.component.scss',
})
export class DialogCreateContactComponent implements OnInit{
  @Output() close = new EventEmitter<boolean>();
  visible: boolean = true;
  isLoading: boolean = false;
  bg_colors: string[] = ['#FF7A00','#462F8A','#FFBB2B','#FC71FF','#6E52FF','#1FD7C1','#9327FF','#FF4646']
  phoneNumberValidator = Validators.pattern(/^\+?[0-9]{8,}$/);



  createContactForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl('')
  })

  constructor(private messageService: MessageService, private formBuilder: FormBuilder, private backendService: BackendServicesService) {}

  ngOnInit(): void {
    this.createContactForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.minLength(8), this.phoneNumberValidator]]
      }
    )
  }

  get f(): { [key: string]: AbstractControl } {
    return this.createContactForm.controls;
  }


  async onSubmit() {
    let createContactJson = this.createContactForm.value;
    try {
      await this.createContact(createContactJson)
    } catch (error) {
      this.setToastErrorMessage(error)
    }
  }

  async createContact(createContactJson: Contact) {
    this.isLoading = true;
    let randomBgColor = this.bg_colors[Math.floor(Math.random() * this.bg_colors.length)];
    await this.backendService.createContact(createContactJson.name, createContactJson.email, createContactJson.phone, randomBgColor);
    this.isLoading = false;
    this.resetForm();
    this.closeDialog(true);

  }

  resetForm(): void {
    this.createContactForm.reset();
  }

  setToastErrorMessage(error: any) {
    debugger
    this.isLoading = false;
    if(error.status === 400 && error.error.email) {
      this.messageService.add({ severity: 'error', summary: 'Creating contact failed!', detail: error.error.email[0] });
    } else {
      this.showError();
      console.log(error)
    }
  }



  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'An unexpected error occurred!',
    });
  }


  closeDialog(success: boolean = false) {
    this.close.emit(success);
  }

}
