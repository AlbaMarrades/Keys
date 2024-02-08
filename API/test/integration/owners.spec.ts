import request from 'supertest'
import app from "../../src/api"
import { DBClient } from '../../src/infrastructure/DBClient'
import AssetRepository from '../../src/services/assets/assetRepository'
import Assets from '../../src/services/assets/assets'

describe('Enpoint list of owners', () => {
    let token = ''

    beforeAll(async () => {
        DBClient.getInstance().connect()
        const response = await request(app).post('/users/login').send({ username: 'miriam', password: 'M1r14m_academy' })
        token = response.body.payload
    })

    afterAll(async () => { 
        DBClient.getInstance().disconnect() 
    })

    beforeEach(async () => {
        await AssetRepository.flush()
    })

    it('exists', async () => {
        const result = await request(app).get('/assets/owners').
            set('Authorization', `Bearer ${token}`)

        expect(result.statusCode).toEqual(200)
    })

    it('returns the correct status', async () => {
        const result = await request(app)
            .get('/assets/owners').
            set('Authorization', `Bearer ${token}`)

        expect(result.body).toMatchObject({ status: 'ok' })
    })

    it('returns the list of different owners', async () => {
        await Assets.createAsset("Aowner", "origin", "portfolioA")
        await Assets.createAsset("Bowner", "otherOrigin", "portfolioB")
        await Assets.createAsset("Cowner", "lastOrigin", "portfolioC")

        const result = await request(app)
            .get('/assets/owners').
            set('Authorization', `Bearer ${token}`)

        expect(result.body).toMatchObject({
            status: 'ok',
            payload: ["Aowner", "Bowner", "Cowner"]
        })
    })

    it('returns the list of owners when there are repeated owners', async () => {
        await Assets.createAsset("Aowner", "origin", "portfolioA")
        await Assets.createAsset("Aowner", "otherOrigin", "portfolioB")
        await Assets.createAsset("Cowner", "lastOrigin", "portfolioC")

        const result = await request(app)
            .get('/assets/owners').
            set('Authorization', `Bearer ${token}`)

        expect(result.body).toMatchObject({
            status: 'ok',
            payload: ["Aowner", "Cowner"]
        })
    })

    it('returns the ordered list of owners when there are repeated owners', async () => {
        await Assets.createAsset("lastOwner", "lastOrigin", "portfolioC")
        await Assets.createAsset("lastOwner", "origin", "portfolioB")
        await Assets.createAsset("otherOwner", "otherOrigin", "portfolioA")
        const result = await request(app)
            .get('/assets/owners').
            set('Authorization', `Bearer ${token}`)
        expect(result.body).toMatchObject({
            status: 'ok',
            payload: ["lastOwner", "otherOwner"]
        })
    })
})
