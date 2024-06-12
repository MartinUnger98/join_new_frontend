import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from '../main-header/main-header.component'; // Passe den Pfad entsprechend an

@NgModule({
  imports: [
    CommonModule,
    MainHeaderComponent
  ],
  declarations: [],
  exports: [
    MainHeaderComponent
  ]
})
export class SharedModule { }
