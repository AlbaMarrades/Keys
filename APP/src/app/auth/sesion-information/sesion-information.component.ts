import { Component, OnInit } from '@angular/core';
import { Token } from '../../../infraestructure/token';

@Component({
  selector: 'app-sesion-information',
  templateUrl: './sesion-information.component.html',
  styleUrls: ['./sesion-information.component.scss']
})

export class SesionInformationComponent implements OnInit {

  expired: boolean = false

  ngOnInit(): void {
    setInterval(() => { this.isValid() }, 1000)
  }

  isValid(): void {
    this.expired = !Token.isValid()
  }

}
