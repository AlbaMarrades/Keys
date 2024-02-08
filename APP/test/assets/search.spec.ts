import { FormsModule } from "@angular/forms"
import { render, screen } from "@testing-library/angular"
import userEvent from "@testing-library/user-event"
import { TranslateTestingModule } from "ngx-translate-testing"
import { SearchComponent } from "../../src/app/assets/search/search.component"
import { MaterialModule } from "../../src/app/material.module"
import { AssetsService } from "../../src/services/assets"
import MyAssetService from "../stubs/myAssetService"

describe('Option search', () => {
    beforeEach(async () => {
        await render(SearchComponent, {
            imports: [
                MaterialModule,
                FormsModule,
                TranslateTestingModule.withTranslations('es', require('../../src/assets/i18n/es.json'))
            ],
            providers: [
                { provide: AssetsService, useClass: MyAssetService }
            ]
        })
    })

    it('has an input', () => {
        const anInput = screen.findByPlaceholderText('ID Activo / ID Origen')

        expect(anInput).not.toBeNull()
    })

    it('has an icon', async () => {
        const icon = screen.findByText('search')

        expect(icon).not.toBeNull()

    })

    it('can write', () => {
        const anInput: HTMLInputElement = screen.getByLabelText('searchId')

        userEvent.type(anInput, 'id')

        expect(anInput).toHaveValue('id')
    })
})