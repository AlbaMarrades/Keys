import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core"
import { Router } from "@angular/router"
import { render, screen } from '@testing-library/angular'
import userEvent from "@testing-library/user-event"
import { TranslateTestingModule } from "ngx-translate-testing"
import { MaterialModule } from "../src/app/material.module"
import { OptionComponent } from "../src/app/navigation/option/option.component"
import { Token } from "../src/infraestructure/token"
import { MyRouter } from './stubs/myRoute'


describe('In the menu options component', () => {
    beforeEach(async () => {
        await render(OptionComponent, {
            imports: [
                MaterialModule,
                TranslateTestingModule.withTranslations('es', require('../src/assets/i18n/es.json'))
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            componentProperties:
            {
                option: 'Anadir Activo',
                icon: 'note_add',
                route: 'new-asset',
                requiredRoles: 'admin'
            },
            providers: [
                { provide: Router, useClass: MyRouter }
            ]
        })
        mockRole('admin')
    })

    it('Exist an icon', async () => {
        const icon = screen.findByRole('img')

        expect(icon).not.toBeNull()
    })

    it('You can send the text as an input', () => {
        const text = screen.getByLabelText('text')

        expect(text).toHaveTextContent("Anadir Activo")
    })

    it('You can send the img as an input', () => {
        const icon = screen.getByRole('img', { hidden: true })

        expect(icon).toHaveTextContent("note_add")
    })

    it('Navigates', () => {
        const spy = jest.spyOn(MyRouter.prototype, 'navigate')
        const item = screen.getByRole('img', { hidden: true })

        userEvent.click(item)

        expect(spy).toHaveBeenCalledWith(["new-asset"])
    })
})

const mockRole = (role: string) => {
    Token.getRole = jest.fn().mockReturnValue(role)
}