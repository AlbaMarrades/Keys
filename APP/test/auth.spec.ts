import { HttpClientModule } from "@angular/common/http"
import { Router } from "@angular/router"
import { fireEvent, render, screen } from "@testing-library/angular"
import { TranslateTestingModule } from "ngx-translate-testing"
import { AuthActionComponent as LogoutComponent } from "../src/app/auth/sesion-information/logout/logout.component"
import { MaterialModule } from "../src/app/material.module"
import { Token } from "../src/infraestructure/token"
import { MyRouter } from "./stubs/myRoute"

describe('In the auth component', () => {
    afterEach(async () => {
        Token.delete()
    })

    afterAll(() => {
        Object.defineProperty(window, 'location', { 
            configurable: true, 
            value: origin });
    })

    beforeAll(async () => {
        Token.delete()
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: { reload: jest.fn() },
        })
    })

    it('only shows login button  when user is not logged', async () => {
        await renderAuth()
        const buttonLogin = screen.getByText('Iniciar sesión')
        const buttonLogout = screen.queryByText('logout')

        expect(buttonLogin).toBeInTheDocument()
        expect(buttonLogout).not.toBeInTheDocument()
    })

    it('only shows logout button when user is logged', async () => {
        addFalseToken()
        await renderAuth()
        const buttonLogout = screen.getByLabelText('logout')
        const buttonLogin = screen.queryByText('Iniciar sesión')

        expect(buttonLogout).toBeInTheDocument()
        expect(buttonLogin).not.toBeInTheDocument()
    })

    it('deletes localStorage when click logout button', async () => {
        addFalseToken()
        await renderAuth()
        const buttonLogout = screen.getByLabelText('logout')
        
        fireEvent.click(buttonLogout)

        expect(Token.isValid()).toBe(false)
    })

    it('navigates to login', async () => {
        await renderAuth()
        const spy = jest.spyOn(MyRouter.prototype, 'navigate')
        const buttonLogin = screen.getByText('Iniciar sesión')
        
        fireEvent.click(buttonLogin)
        
        expect(spy).toHaveBeenCalledWith(["/login"])
    })
})

function addFalseToken(): void {
    const falseToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsInRva2VuQ3JlYXRpb25EYXRlIjoxNjQ5MTY4MjQ5OTkzLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDkxNjgyNDksImV4cCI6MTY0OTE2ODU0OX0._-_S9tC8aJ7yQmqGwPbxDHuWKeFBYmcpAUBeNBKSnXk"
    Token.set(falseToken)
}

async function renderAuth() {
    return render(LogoutComponent, {
        imports: [
            MaterialModule,
            HttpClientModule,
            TranslateTestingModule.withTranslations('es', require('../src/assets/i18n/es.json'))
        ],
        providers: [
            { provide: Router, useClass: MyRouter },
        ]
    })
}
