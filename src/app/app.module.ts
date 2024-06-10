import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { LoginComponent } from './login/login.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputOtpModule } from 'primeng/inputotp';
@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputSwitchModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    InputOtpModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
