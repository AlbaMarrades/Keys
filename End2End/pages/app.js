export default class App {

    static newAsset(value) {
        cy.visit('/new-asset')
        cy.get('[aria-label = "owner"]').find('input').type(value)
        cy.get('[aria-label = "origin"]').find('input').type(value)
        cy.get('[aria-label = "portfolio"]').find('input').type(value)
        cy.get('[aria-label = "submit"]').click()
    }

    static login() {
        cy.visit('//login')
        cy.get('[title="username"]').find('input').type('test')
        cy.get('[title="password"]').find('input').type('test').blur()

        cy.get('[aria-label = "submit"]').click()
    }

    static logout() {
        cy.get('[aria-label="logout"]').click()
    }



}