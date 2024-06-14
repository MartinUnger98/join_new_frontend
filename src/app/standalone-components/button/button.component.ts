import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() btnstyle: string ='';
  @Input() type: string ='';
  @Input() icon: string ='';
  @Input() iconPos?: 'left' | 'right' = 'right';
  @Output() buttonClick = new EventEmitter<void>();

  onButtonClick() {
    this.buttonClick.emit();
  }

  getButtonClass(): string {
    switch(this.btnstyle){
      case 'primary':
        return 'bg-blue-dark text-white font-bold text-xl py-3.5 px-5 rounded-xl hover:bg-blue-primary';
      case 'secondary':
        return 'text-blue-dark font-bold text-xl py-3.5 px-5 rounded-xl hover:text-blue-primary border-2 border-blue-dark hover:border-blue-primary'
      default:
        return '';
    }
  }
}
