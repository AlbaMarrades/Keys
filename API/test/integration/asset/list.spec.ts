import request from 'supertest'
import app from "../../../src/api"
import Asset from '../../../src/domain/asset'
import { DBClient } from '../../../src/infrastructure/DBClient'
import AssetRepository from '../../../src/services/assets/assetRepository'
import Assets from '../../../src/services/assets/assets'


describe('Test assets/list', () => {
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
        const result = await request(app).post('/assets/list').set('Authorization', `Bearer ${token}`)
        expect(result.statusCode).toEqual(200)
    })

    it('returns the correct status', async () => {
        const result = await request(app).
          post('/assets/list').
          set('Authorization', `Bearer ${token}`)

        expect(result.body).toMatchObject({ status: 'ok' })
    })

    it('returns a status and a payload', async () => {
        const asset = await createTestAsset('OUR_UUID', 1, 'firstAsset')

        const result = await request(app).
          post('/assets/list').
          set('Authorization', `Bearer ${token}`)

        expect(result.body).toEqual({
          status: 'ok',
          payload: [asset]
        })
    })

    it('returns several status and payloads', async () => {
        const asset = await createTestAsset('OUR_UUID', 1, 'firstAsset')
        const anotherAsset = await createTestAsset('OTHER_UUID', 2, 'secondAsset')

        const result = await request(app).
          post('/assets/list').
          set('Authorization', `Bearer ${token}`)

        expect(result.body).toEqual({
          status: 'ok',
          payload: [
            anotherAsset, asset
          ]
        })
    })

    it('returns several status and payloads ordered by their timestamp', async () => {
        const asset = await createTestAsset('OUR_UUID', 1, 'firstAsset')
        const anotherAsset = await createTestAsset('OTHER_UUID', 2, 'secondAsset')
        const lastAsset = await createTestAsset('LAST_UUID', 3, 'thirdAsset')

        const result = await request(app).
          post('/assets/list').
          set('Authorization', `Bearer ${token}`)

        expect(result.body).toEqual({
          status: 'ok',
          payload: [
            lastAsset, anotherAsset, asset
          ]
        })
    })
})

async function createTestAsset(UUID: string, timestamp: number, literal: string): Promise<object> {
    mockTime(timestamp)
    mockUUID(UUID)
    await Assets.createAsset(literal, literal, literal)

    return {
      origin: literal,
      owner: literal,
      portfolio: literal,
      timestamp: timestamp,
      UUID: UUID
    }
}

function mockTime(time: number) {
    Asset.prototype.retrieveTime = jest.fn().mockReturnValue(time)
}

function mockUUID(UUID: string) {
    Asset.prototype.createUUID = jest.fn().mockReturnValue(UUID)
}
