import { HttpClientModule } from '@angular/common/http'
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing'
import { render, screen } from '@testing-library/angular'
import { TranslateTestingModule } from 'ngx-translate-testing'
import { ListComponent } from '../../src/app/assets/list/list.component'
import { MaterialModule } from '../../src/app/material.module'
import { AssetsService } from '../../src/services/assets'
import MyAssetService from '../stubs/myAssetService'


describe('Assets list component', () => {
    beforeEach(async () => {
        await render(ListComponent, {
            imports: [
                MaterialModule,
                RouterTestingModule,
                HttpClientModule,
                TranslateTestingModule.withTranslations('es', require('../../src/assets/i18n/es.json'))
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            providers: [
                { provide: AssetsService, useClass: MyAssetService }
            ]
        })
    })

    it('has a header', () => {
        const theHeading = screen.getByText("Listado de Activos")

        expect(theHeading).not.toBeNull()
    })

    it('has a table', () => {
        const theTable = screen.getByRole('table', { hidden: true })

        expect(theTable).not.toBeNull()
    })

    it('the columns has a title', () => {
        const theTitle = screen.getByText("ID Propietario")

        expect(theTitle).not.toBeNull()
    })

    it('the columns has an asset', () => {
        const idAsset = screen.getByText(/anOrigin/)

        expect(idAsset).not.toBeNull()
    })

    it('the asset files are ordered', () => {
        const firstContentRow = screen.getAllByRole('row', { hidden: true })[1]
        const UUIDCell = firstContentRow.getElementsByTagName('td')[0]

        expect(UUIDCell).toHaveTextContent('otherOUR_UUID')
    })
})