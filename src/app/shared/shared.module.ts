import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from '../main-header/main-header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    MainHeaderComponent,
    SidebarComponent
  ],
  declarations: [],
  exports: [
    MainHeaderComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
