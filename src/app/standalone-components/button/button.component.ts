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
  btnStylePrimary: string ='bg-blue-dark text-white font-bold rounded-xl hover:bg-blue-primary'
  btnSizeStandard:string = 'text-xl py-3.5 px-5';
  btnSizeBig:string = 'text-2xl py-3.5 px-14';
  btnStyleSecondary:string = 'text-blue-dark font-bold text-xl py-3.5 px-5 rounded-xl hover:text-blue-primary border-2 border-blue-dark hover:border-blue-primary';

  @Input() text: string = '';
  @Input() btnStyle: string ='';
  @Input() btnStyleBonus: string ='';
  @Input() btnSize: string ='';
  @Input() type: string ='';
  @Input() icon: string ='';
  @Input() iconPos?: 'left' | 'right' = 'right';
  @Input() disabled: boolean = false;
  @Output() buttonClick = new EventEmitter<void>();

  onButtonClick() {
    this.buttonClick.emit();
  }

  getButtonClass(): string {
    let styleBonus = '';
    let btnSize = this.btnSizeStandard;
    if (this.btnStyleBonus) {
      styleBonus = this.btnStyleBonus;
    }
    if (this.btnSize === "big") {
      btnSize = this.btnSizeBig;
    }
    switch(this.btnStyle){
      case 'primary':
        return [this.btnStylePrimary, btnSize, styleBonus].join(' ');
      case 'secondary':
        return [this.btnStyleSecondary,btnSize,styleBonus].join(' ');
      default:
        return '';
    }
  }
}
