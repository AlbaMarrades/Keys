import Fixture from "../fixtures/assets"
import App from "../pages/app"


describe('Keys', () => {

    beforeEach(() => {
        Fixture.clean()
        App.login()
    })

    it('Can add an asset', () => {
        App.newAsset('new')
        cy.location('pathname').should('eq', '/assets-list')
    })

    it('Can not add a duplicate asset', () => {
        App.newAsset('asset')
        App.newAsset('asset')
        cy.get('[aria-label = "error"]').contains('Ya existe el activo')
    })

    it('Can add an asset to the list', () => {
        App.newAsset('one')
        App.newAsset('another')
        cy.get('table').find('tr').should('have.length', 3)
    })

})