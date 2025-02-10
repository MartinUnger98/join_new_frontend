import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  readonly token: string | null = localStorage.getItem('token');

  icons = [
    {
      text: "Summary",
      icon: "pi-table",
      url: "/summary"
    },
    {
      text: "Add-Task",
      icon: "pi-pen-to-square",
      url: "/addTask"
    },
    {
      text: "Board",
      icon: "pi-list",
      url: "/board"
    },
    {
      text: "Contacts",
      icon: "pi-address-book",
      url: "/contacts"
    }
  ]
}
