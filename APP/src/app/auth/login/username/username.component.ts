import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})

export class UsernameComponent {
  @Output() userChanged = new EventEmitter<string>()
  public result :string = ''

  broadcast() {
    this.userChanged.emit(this.result)
  }
}
