import { Component, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';



@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [AvatarModule, AvatarGroupModule, ],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss'
})
export class MainHeaderComponent implements OnInit {
  showLinks: boolean = false;
  loggedInUser: string = '';

  constructor(private eRef: ElementRef, private renderer: Renderer2, private router: Router) {}

  ngOnInit(): void {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      this.loggedInUser = this.getInitialsFromUser(loggedInUser);
    }
  }

  getInitialsFromUser(name: string): string {
    const parts = name.split(/[\s_\-.,]+/);
    const initials = parts.filter(part => part.length > 0).map(part => part[0].toUpperCase());
    return initials.slice(0, 2).join('');
}

  toggleLinks() {
    this.showLinks = !this.showLinks;
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const targetElement = event.target as HTMLElement;
    if (this.showLinks && !this.eRef.nativeElement.contains(targetElement)) {
      this.showLinks = false;
    }
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
