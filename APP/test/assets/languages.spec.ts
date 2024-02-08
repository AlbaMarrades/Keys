import { HttpClientModule } from "@angular/common/http"
import { render, screen } from "@testing-library/angular"
import userEvent from "@testing-library/user-event"
import { TranslateTestingModule } from "ngx-translate-testing"
import { LanguagesComponent } from "../../src/app/language/languages.component"
import { MaterialModule } from "../../src/app/material.module"
import { Languages } from "../../src/infraestructure/languages"
import { AssetsService } from "../../src/services/assets"
import MyAssetService from "../stubs/myAssetService"


describe('The internationalization component', () => {
    beforeEach(async () => {
        await render(LanguagesComponent, {
            imports: [
                MaterialModule,
                HttpClientModule,
                TranslateTestingModule.withTranslations('es', require('../../src/assets/i18n/es.json'))
            ],
            providers: [
                { provide: AssetsService, useClass: MyAssetService }
            ]
        })
    })

    it('shows a button for Spanish language', () => {
        const spanishButton = screen.getByText('es')
        expect(spanishButton).toBeInTheDocument()
    })

    it('shows a button for English language', async () => {
        expect(englishButton()).toBeInTheDocument()
    })

    it('highlights the spanish button when clicking on it', async () => {
        userEvent.click(spanishButton())
        expect(spanishButton()).toHaveClass(SELECTED)
        expect(englishButton()).not.toHaveClass(SELECTED)
    })

    it('highlights the english button when clicking on it', async () => {
        userEvent.click(englishButton())
        expect(englishButton()).toHaveClass(SELECTED)
        expect(spanishButton()).not.toHaveClass(SELECTED)
    })

    it('save the select Spanish button in Local Storage', async () => {
        Languages.saveLanguage(SPANISH)
        expect(localStorage.getItem('language.selected')).toBe(SPANISH)
    })

    it('save the select English button in Local Storage', async () => {
        Languages.saveLanguage(ENGLISH)
        expect(localStorage.getItem('language.selected')).toBe(ENGLISH)
    })

    const spanishButton = () => screen.getByText(SPANISH)
    const englishButton = () => screen.getByText(ENGLISH)

    const SELECTED: string = 'selected'
    const SPANISH: string = 'es'
    const ENGLISH: string = 'en'
})