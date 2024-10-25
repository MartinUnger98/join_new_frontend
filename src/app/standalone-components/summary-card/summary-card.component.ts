import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './summary-card.component.html'
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
    return `text-white bg-blue-dark group-hover:text-${color} group-hover:bg-white`;
  }

  getWidthClass() {
    return this.iconClass ? 'w-64' : 'w-40';
  }
}
