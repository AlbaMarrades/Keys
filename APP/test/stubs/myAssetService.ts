import { Observable, of } from "rxjs"
import { Result } from "../../src/shared/result"

export default class MyAssetService {

    static badLogin: string = '1234'
    static errorMessage: string = 'Error id ya existe'

    list(): Observable<Result> {
        return of({
            status: 'ok',
            payload: [{
                owner: "anOwner", origin: "anOrigin",
                portfolio: "aPortfolio", UUID: "OUR_UUID", timestamp: 1111111111
            }, {
                owner: "otherOwner", origin: "otherOrigin",
                portfolio: "otherPortfolio", UUID: "otherOUR_UUID", timestamp: 1111111112
            }]
        })
    }

    create(owner: string, origin: string, portfolio: string): Observable<Result> {
        return this.stubError(owner)
    }

    retrieve(UUID: string): Observable<Result> {
        return of(
            {
                status: 'ok',
                payload:{
                    owner: "anOwner",
                    origin: "anOrigin",
                    portfolio: "aPortfolio",
                    UUID: UUID,
                    timestamp: 123
                }
            })
    }

    edit(UUID: string, owner: string, origin: string, portfolio: string): Observable<Result> {
        return this.stubError(owner)
    }

    private stubError(owner: string): Observable<Result> {
        if (owner == MyAssetService.badLogin) return of({
            status: 'ko',
            message: MyAssetService.errorMessage
        })

        return of({
            status: 'ok'
        })
    }

    doFilter(): Observable<Result> {
        return of({
            status: 'ok',
            payload: [["aPortfolio", "otherPortfolio"],
                      ["anOwner", "otherOwner"]]
        })
    }

    searchId(): Observable<Result> {
        return of({
            status: 'ok',
            payload: [{
                owner: "anOwner", origin: "anOrigin",
                portfolio: "aPortfolio", UUID: "OUR_UUID", timestamp: 1111111111
            }, {
                owner: "otherOwner", origin: "otherOrigin",
                portfolio: "otherPortfolio", UUID: "otherOUR_UUID", timestamp: 1111111112
            }]
        })
    }
}