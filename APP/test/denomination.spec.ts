import { render, screen } from '@testing-library/angular'
import { DenominationComponent } from '../src/app/denomination/denomination.component'
import { HttpClientModule } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { InfoService } from '../src/services/info'
import { Router } from '@angular/router'
import { MyRouter } from './stubs/myRoute'

class myInfoService {
    getName(): Observable<string> {
        return of('an info')
    }
}

describe('The denomination component', () => {
    it('retrieves the denomination at init time', async () => {
        await render(DenominationComponent, {
            imports: [HttpClientModule],
            providers: [
                { provide: InfoService, useClass: myInfoService },
                { provide: Router, useClass: MyRouter }
            ]
        })
        const theHeading = screen.getByRole('heading', { hidden: true })

        expect(theHeading.textContent).toBe('an info')
    })
})
