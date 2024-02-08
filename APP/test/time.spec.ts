import { HttpClientModule } from "@angular/common/http"
import { Router } from "@angular/router"
import { render, screen } from "@testing-library/angular"
import { TranslateTestingModule } from "ngx-translate-testing"
import { AppComponent } from "../src/app/app.component"
import { TimeComponent } from "../src/app/auth/sesion-information/welcome/time/time.component"
import { MaterialModule } from "../src/app/material.module"
import { Token } from "../src/infraestructure/token"
import { MyRouter } from "./stubs/myRoute"

describe('In the time component', () => {

    afterEach(async () => {
        Token.delete()
    })

    beforeAll(async () => {
        Token.delete()
    })

    it('if you are not logged there isnt time information', async () => {
        await renderAuth()
        const message = screen.queryByText("Su sesión expira a las")
        
        expect(message).not.toBeInTheDocument()
    })

    it('if you are logged there is time information', async () => {
        mocktime('14:22')
        addFalseToken()
        await renderAuth()
        const message = screen.queryByText("Su sesión expira a las 14:22")
       
        expect(message).toBeInTheDocument()
    })

})

function mocktime(time: string): void {
    TimeComponent.prototype.setExpirationHour = jest.fn().mockReturnValue(time)
}

function addFalseToken(): void {
    const falseToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsInRva2VuQ3JlYXRpb25EYXRlIjoxNjQ5MTY4MjQ5OTkzLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDkxNjgyNDksImV4cCI6MTY0OTE2ODU0OX0._-_S9tC8aJ7yQmqGwPbxDHuWKeFBYmcpAUBeNBKSnXk"
    Token.set(falseToken)
}

async function renderAuth() {
    return render(TimeComponent, {
        imports: [
            MaterialModule,
            HttpClientModule,
            TranslateTestingModule.withTranslations('es', require('../src/assets/i18n/es.json'))
        ],
        providers: [
            { provide: Router, useClass: MyRouter }
        ],
        declarations: [
            AppComponent,
        ]
    })
}
