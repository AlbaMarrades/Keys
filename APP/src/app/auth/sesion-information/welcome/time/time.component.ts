import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '../../../../../infraestructure/token';
import { SnackbarErrorComponent } from './snackbar-error/snackbar-error.component';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})

export class TimeComponent implements OnInit {
  public expiredHour: string = ''
  private readonly TOKEN: string = Token.get()
  private timer = setInterval(() => { this.expiredToken() }, 1000)
  private jwtHelper: JwtHelperService = new JwtHelperService()

  constructor(private router: Router, private errorSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.expiredHour = this.setExpirationHour()
  }

  public isValid(): boolean {
    return Token.isValid()
  }

  public setExpirationHour(): string {
    if (this.TOKEN == null) return ''
    const date: Date = Token.getExpirationDate(this.TOKEN)
    return Token.getExpirationHour(date)
  }

  private expiredToken(): void {
    if (Token.isExpired(this.TOKEN) && Token.isValid()) {
      clearInterval(this.timer)
      Token.delete()
      this.errorSnackBar.openFromComponent(SnackbarErrorComponent, {
        duration: 5000,
        panelClass: ["errorSnackBar"]
      })
      this.router.navigate(['/login'])
    }
  }
}
