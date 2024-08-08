import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from '../standalone-components/main-header/main-header.component';
import { SidebarComponent } from '../standalone-components/sidebar/sidebar.component';
import { InputFieldComponent } from '../standalone-components/input-field/input-field.component';
import { ButtonComponent } from '../standalone-components/button/button.component';
import { DialogContactComponent } from '../standalone-components/dialog-contact/dialog-contact.component';
import { CardTaskComponent } from '../standalone-components/card-task/card-task.component';
import { DialogTaskDetailComponent } from '../standalone-components/dialog-task-detail/dialog-task-detail.component';



@NgModule({
  imports: [
    CommonModule,
    MainHeaderComponent,
    SidebarComponent,
    InputFieldComponent,
    ButtonComponent,
    DialogContactComponent,
    CardTaskComponent,
    DialogTaskDetailComponent
  ],
  declarations: [],
  exports: [
    MainHeaderComponent,
    SidebarComponent,
    InputFieldComponent,
    ButtonComponent,
    DialogContactComponent,
    CardTaskComponent,
    DialogTaskDetailComponent
  ]
})
export class SharedModule { }
