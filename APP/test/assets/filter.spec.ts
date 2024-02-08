import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core"
import { render, screen } from "@testing-library/angular"
import userEvent from "@testing-library/user-event"
import { FilterComponent } from "../../src/app/assets/filter/filter.component"
import { MaterialModule } from "../../src/app/material.module"
import { AssetsService } from "../../src/services/assets"
import MyAssetService from "../stubs/myAssetService"

describe('Selects portfolio test', () => {
    beforeEach(async () => {
        await render(FilterComponent, {
            imports: [MaterialModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            componentProperties:
            {
                searchTerm: 'portfolios'
            },
            providers: [
                { provide: AssetsService, useClass: MyAssetService }
            ],
        })
    })

    it('Select exists', () => {
        const select = screen.getByLabelText('selectportfolios')

        expect(select).not.toBeNull()
    })

    it('Has a label', () => {
        const label = screen.findByPlaceholderText('Elige Cartera')

        expect(label).not.toBeNull()
    })

    it('The selection has the focus', () => {
        const select = screen.getByLabelText('selectportfolios')
        
        userEvent.click(select)

        expect(select).toHaveFocus()
    })

    it('The default option is "--" and exists', () => {
        const select = screen.getByLabelText('selectportfolios')
       
        userEvent.click(select)
        const optionDefault = screen.getByText('--------------------------')

        expect(optionDefault).not.toBeNull()
        expect(optionDefault).toHaveTextContent('--')
    })

    it('retrieve a portfolios list', () => {
        const select = screen.getByLabelText('selectportfolios')
       
        userEvent.click(select)
        const option = screen.getAllByLabelText('option')
        const portfolioSelect = option[0]

        expect(portfolioSelect).toHaveTextContent('aPortfolio')
    })
})

describe('Selects owner test', () => {
    beforeEach(async () => {
        await render(FilterComponent, {
            imports: [MaterialModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            componentProperties:
            {
                searchTerm: 'owners'
            },
            providers: [
                { provide: AssetsService, useClass: MyAssetService }
            ],
        })
    })

    it('Select exists', () => {
        const select = screen.getByLabelText('selectowners')

        expect(select).not.toBeNull()
    })

    it('Has a label', () => {
        const label = screen.findByPlaceholderText('Elige Cartera')

        expect(label).not.toBeNull()
    })

    it('The selection has the focus', () => {
        const select = screen.getByLabelText('selectowners')

        userEvent.click(select)

        expect(select).toHaveFocus()
    })

    it('The default option is "--" and exists', () => {
        const select = screen.getByLabelText('selectowners')
        
        userEvent.click(select)
        const optionDefault = screen.getByText('--------------------------')

        expect(optionDefault).not.toBeNull()
        expect(optionDefault).toHaveTextContent('--------------------------')
    })

    it('retrieve an owner list', () => {
        const select = screen.getByLabelText('selectowners')
       
        userEvent.click(select)
        const option = screen.getAllByLabelText('option')
        const ownerSelect = option[1]

        expect(ownerSelect).toHaveTextContent('anOwner')
    })
})