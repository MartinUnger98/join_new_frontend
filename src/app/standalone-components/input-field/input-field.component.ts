import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, FormsModule, CommonModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent {
  @Input() type: string = 'text';
  @Input() model: any;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() autocomplete: string = '';
  @Input() iconClass: string = '';
  @Input() iconDynamicClass: any = null;
  @Output() iconClick: EventEmitter<void> = new EventEmitter<void>();

  onIconClick() {
    this.iconClick.emit();
  }
}
