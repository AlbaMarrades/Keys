import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})

export class PasswordComponent {
  @Output() passChanged = new EventEmitter<string>()
  public result :string = ''

  broadcast() {
    this.passChanged.emit(this.result)
  }

  hide = true;

}
