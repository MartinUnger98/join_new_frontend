import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterModule],
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
  currentView: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateCurrentView(this.router.url);
    this.router.events
    .pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    )
    .subscribe((event) => {
      this.updateCurrentView(event.urlAfterRedirects);
    });
  }

  updateCurrentView(url: string): void {
    const segments = url.split('/');
    const last = segments.pop() || '';
    this.currentView = `/${last}`;
  }
}
