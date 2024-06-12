import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  icons = [
    {
      text: "Summary",
      icon: "pi-table"
    },
    {
      text: "Add-Task",
      icon: "pi-pen-to-square"
    },
    {
      text: "Board",
      icon: "pi-list"
    },
    {
      text: "Contacts",
      icon: "pi-address-book"
    }
  ]
}
