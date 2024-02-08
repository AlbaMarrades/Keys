import { Component } from '@angular/core'
import { Languages } from '../../infraestructure/languages'
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-languages',
    templateUrl: './languages.component.html',
    styleUrls: ['./languages.component.scss']
})

export class LanguagesComponent {

    selectedLanguage: string = ''

    constructor(public translate: TranslateService) { }

    onSelect(language: string) {
        this.translate.setDefaultLang(language)
        this.selectedLanguage = language
        localStorage.setItem('language.selected', language)
    }

    ngOnInit(): void {
        this.selectedLanguage = Languages.retrieveLanguage()
    }
}
