import { Component, OnInit } from '@angular/core';
import { Token } from '../infraestructure/token';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  isLogged: boolean = false
  private language: Array<string>;

  constructor(public translate: TranslateService) {
    this.language = ['es', 'en'];
    translate.addLangs(this.language);
    translate.setDefaultLang('es');
  }

  token: boolean = Token.isValid()

  ngOnInit() {
    if (this.token) {
      this.isLogged = true
    }
  }
  
  logged(): void {
    if (this.token) {
      this.isLogged = true
    }
  }
}
