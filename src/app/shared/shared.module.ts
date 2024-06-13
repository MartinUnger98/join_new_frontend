import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from '../standalone-components/main-header/main-header.component';
import { SidebarComponent } from '../standalone-components/sidebar/sidebar.component';
import { InputFieldComponent } from '../standalone-components/input-field/input-field.component';


@NgModule({
  imports: [
    CommonModule,
    MainHeaderComponent,
    SidebarComponent,
    InputFieldComponent
  ],
  declarations: [],
  exports: [
    MainHeaderComponent,
    SidebarComponent,
    InputFieldComponent
  ]
})
export class SharedModule { }
