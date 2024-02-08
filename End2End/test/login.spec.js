import Fixture from "../fixtures/assets"
import App from "../pages/app"


describe('Keys', () => {
    
    beforeEach(()=>{
        Fixture.clean()
        App.login()
    })

    it('can login', () => {
        cy.get('[class="user"]').contains('test')
    })

    it('can logout', () => {
        App.logout()
        cy.get('[class="user"]').should('not.exist')
    })
    
})