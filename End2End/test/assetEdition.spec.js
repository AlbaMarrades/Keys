import Fixture from "../fixtures/assets"
import App from "../pages/app"


describe('Keys', () => {

    beforeEach(() => {
        Fixture.clean()
        App.login()
        App.newAsset('asset')
    })

    it('Can go to edit-asset', () => {
        cy.get('[aria-label = edit]').click()
        cy.location('pathname').should('contains', '/edit-asset/')
    })

    it('We can edit an asset', () => {
        cy.get('[aria-label = edit]').click()
        cy.get('[aria-label = "owner"]').find('input').clear().type('changed')
        cy.get('[aria-label = "update"]').click()
        cy.get('table').contains('changed')
    })

})