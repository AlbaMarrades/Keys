import { fireEvent, render, screen } from '@testing-library/angular'
import { MaterialModule } from '../../src/app/material.module'
import { ActivatedRoute, Router } from '@angular/router';
import { EditComponent } from '../../src/app/assets/edit/edit.component'
import { FieldComponent } from '../../src/app/field/field.component';
import { HttpClientModule } from '@angular/common/http';
import { AssetsService } from '../../src/services/assets';
import MyAssetService from '../stubs/myAssetService';
import userEvent from '@testing-library/user-event';
import { MyRouter } from '../stubs/myRoute'
import { TranslateTestingModule } from 'ngx-translate-testing';


describe('The edition form', () => {
    beforeEach(async () => {
        await render(EditComponent, {
            declarations: [
                FieldComponent
            ],
            imports: [
                MaterialModule,
                HttpClientModule,
                TranslateTestingModule.withTranslations('es', require('../../src/assets/i18n/es.json'))
            ],
            providers: [
                { provide: Router, useClass: MyRouter },
                { provide: ActivatedRoute, useClass: MyRouter },
                { provide: AssetsService, useClass: MyAssetService }
            ]
        }
        )
    })

    it('it complete fields when edit form is open', () => {
        expect(owner().value).toBe('anOwner')
        expect(origin().value).toBe('anOrigin')
        expect(portfolio().value).toBe('aPortfolio')
    })

    it('Enabled update when fields are filled', () => {
        const anyValue: string = 'any value'

        userEvent.type(owner(), anyValue)
        userEvent.type(origin(), anyValue)

        expect(updateButton()).toBeEnabled()
    })

    it('disabled update when fields are filled', () => {
        userEvent.clear(owner())

        expect(updateButton()).toBeDisabled()
    })
    it('shows an error message when dont receives an object', () => {
        const badLogin: string = MyAssetService.badLogin

        userEvent.clear(owner())
        userEvent.type(owner(), badLogin)
        userEvent.clear(origin())
        userEvent.type(origin(), badLogin)
        fireEvent.click(updateButton())
        const error = screen.getByLabelText('error')
        
        expect(error).toHaveTextContent("Ya existe el activo")
    })

    const owner = () => screen.getByLabelText('owner').querySelector('input')!
    const origin = () => screen.getByLabelText('origin').querySelector('input')!
    const portfolio = () => screen.getByLabelText('portfolio').querySelector('input')!
    const updateButton = () => screen.getByLabelText('update')
})