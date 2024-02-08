import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})

export class FieldComponent {
  @Input() title: string = ''
  @Input() value: string = ''
  @Input() require: boolean = false
  @Output() onKeyUp = new EventEmitter()

  id_owner: string = ''
  id_origin: string = ''
  
  emitEvent(event: Event): void {
    this.onKeyUp.emit(event)
  }

}
