import { HttpClientModule } from "@angular/common/http"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { fireEvent, render, screen } from "@testing-library/angular"
import userEvent from "@testing-library/user-event"
import { TranslateTestingModule } from "ngx-translate-testing"
import { Observable } from "rxjs"
import { AppComponent } from "../src/app/app.component"
import { LoginComponent } from "../src/app/auth/login/login.component"
import { PasswordComponent } from "../src/app/auth/login/password/password.component"
import { UsernameComponent } from "../src/app/auth/login/username/username.component"
import { MaterialModule } from "../src/app/material.module"
import { Token } from "../src/infraestructure/token"
import { Auth } from "../src/services/auth"
import MyAuthService from "./stubs/myAuthService"
import { MyRouter } from "./stubs/myRoute"


describe('login component', () => {
    beforeEach(async () => {
        await render(LoginComponent, {
            imports: [
                MaterialModule,
                FormsModule,
                HttpClientModule,
                TranslateTestingModule.withTranslations('es', require('../src/assets/i18n/es.json'))
            ],
            declarations: [
                PasswordComponent,
                UsernameComponent,
                AppComponent
            ],
            providers: [
                { provide: Router, useClass: MyRouter },
                { provide: Auth, useClass: MyAuthService },
            ]
        })
    })

    afterEach(() => {
        Token.delete()
    })

    it('Has an input for password', () => {
        const anInput = screen.getByLabelText('password')

        expect(anInput).not.toBeNull()
    })

    it('Has an input for username', () => {
        const anInput = screen.getByLabelText('username')
       
        expect(anInput).not.toBeNull()
    })

    it('Cant login', () => {
        const badLogin: string = MyAuthService.badLogin
        const error = () => screen.getByLabelText('error')

        login(badLogin)

        expect(error()).toHaveTextContent('Usuario o contraseña incorrecta')
    })

    it('Can login', () => {
        const spy = jest.spyOn(MyRouter.prototype, 'navigate')
        const goodLogin: string = MyAuthService.goodLogin

        login(goodLogin)

        expect(spy).toHaveBeenCalledWith(["assets-list"])
    })

    it('Recieves a token', () => {
        const goodLogin: string = MyAuthService.goodLogin
        let result: Object = {}

        login(goodLogin)
        const token = new MyAuthService().getAuth(goodLogin, goodLogin) as Observable<Object>
        token.subscribe(e => {
            result = e
        })
    
        expect(result).toMatchObject({ status: 'ok', payload: "tokenStub" })
    })

    it('Saves a token', () => {
        const goodLogin: string = MyAuthService.goodLogin

        login(goodLogin)
        const token = Token.get()

        expect(token).toEqual("tokenStub")
    })
})

function login(login: string) {
    const username = () => screen.getByLabelText('username')
    const password = () => screen.getByLabelText('password')
    const submitButton = () => screen.getByLabelText('submit')

    userEvent.type(username(), login)
    userEvent.type(password(), login)
    userEvent.tab()
    fireEvent.click(submitButton())
}