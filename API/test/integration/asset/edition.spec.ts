import request from 'supertest'
import app from "../../../src/api"
import Asset from '../../../src/domain/asset'
import { DBClient } from '../../../src/infrastructure/DBClient'
import AssetRepository from '../../../src/services/assets/assetRepository'

describe('Enpoint asset edition', () => {
    let token = ''

    beforeAll(async () => {
        DBClient.getInstance().connect()
        const response = await request(app).post('/users/login').send({ username: 'miriam', password: 'M1r14m_academy' })
        token = response.body.payload
    })

    afterAll(async () => { DBClient.getInstance().disconnect() })

    beforeEach(async () => {
        await AssetRepository.flush()
    })

    it('there is an end point assets/edit', async () => {
        const result = await request(app).
            post('/assets/edit').
            set('Authorization', `Bearer ${token}`)

        expect(result.statusCode).toEqual(200)
    })

    it('if the asset to edit exists, we will get ok message', async () => {
        mockUUID('OUR_UUID')
        const asset: Object = { owner: "anOwner", origin: 'anOrigin' }

        await request(app).
            post('/assets/new').
            send(asset).
            set('Authorization', `Bearer ${token}`)

        const editable: Object = {
            owner: 'newOwner',
            origin: 'newOrigin',
            portfolio: 'newPortfolio',
            UUID: 'OUR_UUID'
        }

        const result = await request(app).
            post('/assets/edit').
            send(editable).
            set('Authorization', `Bearer ${token}`)

        expect(result.body.status).toBe('ok')
    })

    it('if the asset to edit does not exists, we will get ko message', async () => {
        mockUUID('OUR_UUID')
        const asset: Object = { owner: "anOwner", origin: 'anOrigin' }

        await request(app).
            post('/assets/new').
            send(asset).
            set('Authorization', `Bearer ${token}`)

        const editable: Object = {
            owner: 'newOwner',
            origin: 'newOrigin',
            portfolio: 'newPortfolio',
            UUID: 'OTHER_UUID'
        }

        const result = await request(app).
            post('/assets/edit').
            send(editable).
            set('Authorization', `Bearer ${token}`)

        expect(result.body.status).toBe('ko')
    })

    it('if the edited asset match with other one, we will get ko message', async () => {
        const existent: Object = { owner: "existent", origin: 'existent' }
        await request(app).
            post('/assets/new').
            send(existent).
            set('Authorization', `Bearer ${token}`)

        const asset: Object = { owner: "owner", origin: 'origin' }
        mockUUID('JUST_ANOTHER_UUID')
        await request(app).
            post('/assets/new').
            send(asset).
            set('Authorization', `Bearer ${token}`)

        const editable: Object = {
            owner: "existent",
            origin: "existent",
            UUID: 'JUST_ANOTHER_UUID'
        }

        const result = await request(app).
            post('/assets/edit').
            send(editable).
            set('Authorization', `Bearer ${token}`)

        expect(result.body.status).toBe('ko')
    })
})

const mockUUID = (UUID: string) => {
    Asset.prototype.createUUID = jest.fn().mockReturnValue(UUID)
}