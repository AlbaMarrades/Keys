import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '../../../infraestructure/token';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  username: string = ''
  password: string = ''
  error: boolean = false

  constructor(private auth: Auth, private routes: Router) { }

  incomplete() {
    return (this.username == '') || (this.password == '')
  }

  login() {
    this.auth.getAuth(this.username, this.password)
      .subscribe(data => {

        if (data.status == 'ok') {
          Token.set(data.payload!.toString())
          this.routes.navigate(["assets-list"]).then(() => {
            window.location.reload()
          })
        } else {
          this.error = true
        }
      })
  }

  enterKeyPressed(event: any) {
    if (event.key === "Enter") {
      this.login()
      return true
    }
    return false
  }

  getUsername(event: Event) {
    const username = event.target as HTMLInputElement
    const value: string = username.value
    this.username = value.trim()
    return this.username
  }

  getPassword(event: Event) {
    const password = event.target as HTMLInputElement
    const value: string = password.value
    this.password = value.trim()
    return this.password
  }
}
