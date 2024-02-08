import Fixture from "../fixtures/assets"
import App from "../pages/app"


describe('Keys', () => {
    
    beforeEach(()=>{
        Fixture.clean()
        App.login()
        App.newAsset('assetA')
        App.newAsset('assetB')
        App.newAsset('assetC')
    })   

    it('We can search an asset', ()=>{
        cy.get('[aria-label = "searchId"]').type('assetB')
        cy.get('img').click()
        cy.get('table').contains('assetB')
        cy.get('table').contains('assetA').should('not.exist');
    })


    it('We can search an asset by portfolio', ()=>{
        cy.get('[aria-label = "selectportfolios"]').wait(1000).click()      
          .get('mat-option').contains("assetB").wait(1000).click()
        cy.get('table').contains('assetB')
        cy.get('table').contains('assetA').should('not.exist');
    })

    it('We can search an asset by owner', ()=>{
        cy.get('[aria-label = "selectowners"]').wait(1000).click()      
          .get('mat-option').contains("assetB").wait(1000).click()
        cy.get('table').contains('assetB')
        cy.get('table').contains('assetA').should('not.exist');
    })

    it('We can search an asset by portfolio and owner', ()=>{
        cy.get('[aria-label = "selectportfolios"]').click()      
          .get('mat-option').contains("assetB").wait(1000).click()
        cy.get('[aria-label = "selectowners"]').wait(1000).click()      
          .get('mat-option').contains("assetA").wait(1000).click()

        cy.get('td').should('not.exist')
    })

    it('We can search an asset by portfolio, owner and origin', ()=>{
      
        cy.get('[aria-label = "selectportfolios"]').click()
          .get('mat-option').contains("assetB").wait(1000).click()

        cy.get('[aria-label = "selectowners"]').click()
          .get('mat-option').contains("assetB").wait(1000).click()
        
        cy.get('[aria-label = "searchId"]').type('assetB')
        cy.get('img').wait(1000).click()

        cy.get('table').contains('assetB')
        cy.get('table').contains('assetA').should('not.exist');
    })

})

