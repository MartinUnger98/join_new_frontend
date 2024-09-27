import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss']
})
export class DialogAddTaskComponent {

  @Output() close = new EventEmitter<boolean>();
  @Input() visible: boolean = true;

  constructor() {}

  closeDialog(success: boolean = false) {
    this.visible = false;
    this.close.emit(success);
  }

  onCloseAddTask(success: boolean) {
    this.closeDialog(success);
  }
}
