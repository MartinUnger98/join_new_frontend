import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss'
})
export class SummaryCardComponent {
  @Input() count: number = 0;
  @Input() title: string = '';
  @Input() iconClass: string | null = null;
  @Input() hoverColor: string = 'bg-blue-dark';

  get hoverColorClass() {
    return `hover:${this.hoverColor}`;
  }

  get iconBgClass() {
    const color = this.hoverColor.replace("bg-", "");
    return {
      'text-white': true,
      'bg-blue-dark': true,
      'group-hover:bg-white': true,
      [`text-${color}`]: true,
      [`group-hover:text-${color}`]: true
    };
  }


  getWidthClass() {
    return this.iconClass
      ? '900:w-64 800:w-52 600:w-64 420:w-40 w-32'
      : '900:w-40 800:w-32 600:w-40 420:w-24 w-20 ';
  }

}
