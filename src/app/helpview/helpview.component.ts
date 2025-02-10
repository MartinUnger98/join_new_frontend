import { Component } from '@angular/core';

@Component({
  selector: 'app-helpview',
  templateUrl: './helpview.component.html',
  styleUrl: './helpview.component.scss'
})
export class HelpviewComponent {
  readonly token: string | null = localStorage.getItem('token');
}
