import request from 'supertest'
import app from "../../src/api"
import { DBClient } from '../../src/infrastructure/DBClient'
import AssetRepository from '../../src/services/assets/assetRepository'
import Assets from '../../src/services/assets/assets'


describe('Enpoint list of portfolios', () => {
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
        const result = await request(app).
            get('/assets/portfolios').
            set('Authorization', `Bearer ${token}`)

        expect(result.statusCode).toEqual(200)
    })

    it('returns the correct status', async () => {
        const result = await request(app)
            .get('/assets/portfolios').
            set('Authorization', `Bearer ${token}`)

        expect(result.body).toMatchObject({ status: 'ok' })
    })

    it('returns the list of different portfolios', async () => {
        await Assets.createAsset("owner", "origin", "portfolioA")
        await Assets.createAsset("otherOwner", "otherOrigin", "portfolioB")
        await Assets.createAsset("lastOwner", "lastOrigin", "portfolioC")

        const result = await request(app)
            .get('/assets/portfolios').
            set('Authorization', `Bearer ${token}`)

        expect(result.body).toMatchObject({
            status: 'ok',
            payload: ["portfolioA", "portfolioB", "portfolioC"]
        })
    })

    it('returns the list of portfolios when there are repeated portfolios', async () => {
        await Assets.createAsset("owner", "origin", "portfolioA")
        await Assets.createAsset("otherOwner", "otherOrigin", "portfolioA")
        await Assets.createAsset("lastOwner", "lastOrigin", "portfolioC")

        const result = await request(app)
            .get('/assets/portfolios').
            set('Authorization', `Bearer ${token}`)

        expect(result.body).toMatchObject({
            status: 'ok',
            payload: ["portfolioA", "portfolioC"]
        })
    })

    it('returns the ordered list of portfolios when there are repeated portfolios', async () => {
        await Assets.createAsset("lastOwner", "lastOrigin", "portfolioC")
        await Assets.createAsset("owner", "origin", "portfolioA")
        await Assets.createAsset("otherOwner", "otherOrigin", "portfolioA")
        const result = await request(app)
            .get('/assets/portfolios').
            set('Authorization', `Bearer ${token}`)
        expect(result.body).toMatchObject({
            status: 'ok',
            payload: ["portfolioA", "portfolioC"]
        })
    })
})
