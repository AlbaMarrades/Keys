import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '../../../../infraestructure/token';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})

export class AuthActionComponent {

  constructor(private myRouter: Router) { }
  
  toLogin(): void {
    this.myRouter.navigate(["/login"])
  }

  isLogged() {
    return Token.isValid()
  }

  toLogout() {
    Token.delete()
    this.toLogin()
    window.location.reload()
  }
}
