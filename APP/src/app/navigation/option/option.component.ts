import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '../../../infraestructure/token';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})

export class OptionComponent implements OnInit {
  @Input() option: string = ''
  @Input() icon: string = ''
  @Input() route: string = ''
  @Input() requiredRoles: string = ''
  visible: boolean = false

  constructor(private routes: Router) { }

  ngOnInit(): void {
    this.isVisible()
  }

  navigate(): void {
    this.routes.navigate([this.route])
  }

  isAtRoute(): boolean {
    const currentRoute = this.routes.url
    const personalRoute = '/' + this.route
    return personalRoute == currentRoute
  }

  isVisible(): void {
    const role: string = Token.getRole()
    const authRoles: string[] = this.requiredRoles.split(',')
    this.visible = authRoles.includes(role)
  }
}
