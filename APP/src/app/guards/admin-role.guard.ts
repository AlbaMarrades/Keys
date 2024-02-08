import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Token } from '../../infraestructure/token';

@Injectable({
  providedIn: 'root'
})

export class AdminRoleGuard implements CanActivate, CanLoad {

  constructor(private router: Router) { }

  canActivate(): boolean {
    return this.canLoad()
  }
  
  canLoad(): boolean {
    const role: string = Token.getRole()
    if (role == 'admin') {
      return true
    }
    
    this.router.navigate(['/assets-list'])
    return false
  }
}
