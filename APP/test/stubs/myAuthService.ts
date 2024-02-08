import { Observable, of } from "rxjs"
import { Result } from "../../src/shared/result"

export default class MyAuthService {
    static badLogin: string = '1234'
    static goodLogin: string = 'test'
    static token: any = { get: 'tokenStub' }

    getAuth(username: string, password: string): Observable<Result> {
        return this.stubError(password)
    }

    private stubError(password: string): Observable<Result> {
        if (password == MyAuthService.badLogin) return of({
            status: 'ko'
        })

        return of({
            status: 'ok',
            payload: MyAuthService.token.get
        })
    }
}