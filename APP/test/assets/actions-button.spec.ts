import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { fireEvent, render, screen } from '@testing-library/angular';
import { AssetActionsComponent } from '../../src/app/assets/action/action.component';
import { MaterialModule } from '../../src/app/material.module';
import { MyRouter } from '../stubs/myRoute'


describe('In the menu options component', () => {
    beforeEach(async () => {
        await render(AssetActionsComponent, {
            imports: [
                MaterialModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            componentProperties:
            {
                UUID: '2856',
                icon: 'note_add',
                path: 'edit-asset/'
            },
            providers: [
                { provide: Router, useClass: MyRouter }
            ]
        })
    })
    it('We have a edit button', () => {
        const editButton = screen.queryByLabelText('action')
        
        expect(editButton).not.toBeNull()
    })

    it('navigates', () => {
        const spy = jest.spyOn(MyRouter.prototype, 'navigate')
        const item = screen.getByLabelText('action')
        
        fireEvent.click(item)
        
        expect(spy).toHaveBeenCalledWith(["/edit-asset/", "2856"])
    })

})
