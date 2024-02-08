import { Component, OnInit } from '@angular/core';
import { Token } from '../../infraestructure/token';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  isLogged: boolean = false
  token: boolean = Token.isValid()

  ngOnInit() {
    if (this.token) {
      this.isLogged = true
    }
  }
}
