import { RouterTestingModule } from '@angular/router/testing'
import { fireEvent, screen, render } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { TranslateTestingModule } from 'ngx-translate-testing'
import { FormComponent } from '../../src/app/assets/form/form.component'
import { FieldComponent } from '../../src/app/field/field.component'
import { MaterialModule } from '../../src/app/material.module'
import { AssetsService } from '../../src/services/assets'
import MyAssetService from '../stubs/myAssetService'


describe('The assets-form component', () => {
    beforeEach(async () => {
        await render(FormComponent, {
            declarations: [
                FieldComponent
            ],
            imports: [
                MaterialModule,
                RouterTestingModule,
                TranslateTestingModule.withTranslations('es', require('../../src/assets/i18n/es.json'))
            ],
            providers: [
                { provide: AssetsService, useClass: MyAssetService }
            ]
        })

    })

    it('starts with the submit button disabled', () => {
        expect(submitButton()).toBeDisabled()
    })

    it('Enabled submit when fields are filled', () => {
        const anyValue: string = 'any value'

        userEvent.type(owner(), anyValue)
        userEvent.type(origin(), anyValue)
        userEvent.tab()

        expect(submitButton()).toBeEnabled()
    })

    it('containts an object', () => {
        const badLogin: string = '1234'

        userEvent.type(owner(), badLogin)
        userEvent.type(origin(), badLogin)
        fireEvent.click(submitButton())

        expect.objectContaining({ asset: badLogin })
    })

    it('shows an error message when dont receives an object', () => {
        const badLogin: string = MyAssetService.badLogin

        userEvent.type(owner(), badLogin)
        userEvent.type(origin(), badLogin)
        fireEvent.click(submitButton())
        const error = screen.getByLabelText('error')

        expect(error).toHaveTextContent("Ya existe el activo")
    })

    const owner = () => screen.getByLabelText('owner').querySelector('input')!
    const origin = () => screen.getByLabelText('origin').querySelector('input')!
    const submitButton = () => screen.getByLabelText('submit')
})

