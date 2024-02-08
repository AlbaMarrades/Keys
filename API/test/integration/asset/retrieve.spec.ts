import request from 'supertest'
import app from "../../../src/api"
import Asset from '../../../src/domain/asset'
import { DBClient } from '../../../src/infrastructure/DBClient'
import AssetRepository from '../../../src/services/assets/assetRepository'
import Assets from '../../../src/services/assets/assets'

describe("On info list", () => {
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

    it('the route exists', async () => {
        const result = await request(app).get('/assets/retrieve/UUID').set('Authorization', `Bearer ${token}`)
        expect(result.statusCode).toEqual(200)
    })

    it('returns the correct status', async () => {
        mockUUID("OUR_UUID")
        await Assets.createAsset('anOwner', 'anOrigin', 'aPortfolio')

        const result = await request(app).
          get('/assets/retrieve/OUR_UUID').
          set('Authorization', `Bearer ${token}`)

        expect(result.body).toMatchObject({ status: 'ok' })
    })

    it('returns the correct asset', async () => {
        mockUUID("OUR_UUID")
        await Assets.createAsset('anOwner', 'anOrigin', 'aPortfolio')

        const result = await request(app).
          get('/assets/retrieve/OUR_UUID').
          set('Authorization', `Bearer ${token}`)

        expect(result.body).toMatchObject({ payload: { owner: "anOwner" } })
    })

    it('returns ko and message if dont find any UUID', async () => {
        mockUUID("OUR_UUID")
        await Assets.createAsset('anOwner', 'anOrigin', 'aPortfolio')

        const result = await request(app).
          get('/assets/retrieve/OUR_UUIrfthg46').
          set('Authorization', `Bearer ${token}`)

        expect(result.body).toMatchObject({ status: 'ko', message: 'No existe ese ID Activo' })
    })
})

function mockUUID(UUID: string) {
  Asset.prototype.createUUID = jest.fn().mockReturnValue(UUID)
}