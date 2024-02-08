import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Token } from '../../infraestructure/token'

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const isLogged: boolean = Token.isValid()
    if (!isLogged) {
      return true
    }
    
    this.router.navigate(['/assets-list'])
    return false
  }

}
