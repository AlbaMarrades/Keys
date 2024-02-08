import { Component } from '@angular/core';
import { Token } from '../../../../infraestructure/token';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent {

  username: string = Token.getUsername()

  isLogged() {
    return Token.isValid()
  }
}
