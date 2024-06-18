import { Component, ElementRef, Renderer2, HostListener } from '@angular/core';
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
export class MainHeaderComponent {
  showLinks: boolean = false;

  constructor(private eRef: ElementRef, private renderer: Renderer2, private router: Router) {}

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
