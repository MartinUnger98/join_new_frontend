import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { LoginComponent } from './login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Neue Importe
import { ContactsComponent } from './contacts/contacts.component';
import { SharedModule } from './shared/shared.module';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DialogModule } from 'primeng/dialog';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AddTaskComponent } from './add-task/add-task.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { BoardComponent } from './board/board.component';
import { SummaryComponent } from './summary/summary.component';
import { DragDropModule } from 'primeng/dragdrop';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactsComponent,
    SignUpComponent,
    AddTaskComponent,
    BoardComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ProgressSpinnerModule,
    ToastModule,
    RippleModule,
    BrowserAnimationsModule,
    AvatarModule,
    AvatarGroupModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextareaModule,
    MultiSelectModule,
    SelectButtonModule,
    DropdownModule,
    IconFieldModule,
    InputIconModule,
    DragDropModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
