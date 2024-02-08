import request from 'supertest'
import app from "../../../src/api"
import Asset from '../../../src/domain/asset'
import { DBClient } from '../../../src/infrastructure/DBClient'
import AssetRepository from '../../../src/services/assets/assetRepository'
import Assets from '../../../src/services/assets/assets'

describe('In the filter endpoint', () => {
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
  
    it('there is an end point assets/list', async () => {
        const result = await request(app).
          post('/assets/list').
          send({ searchTerm: 'OUR_UUID' }).
          set('Authorization', `Bearer ${token}`)
  
      expect(result.statusCode).toEqual(200)
    })
  
    it('when there is not filter criteria, it sends a list with all the assets', async () => {
        const asset = await createTestAsset('OUR_UUID', 1, 'firstAsset')
        const anotherAsset = await createTestAsset('OTHER_UUID', 2, 'secondAsset')
        const lastAsset = await createTestAsset('LAST_UUID', 3, 'thirdAsset')
    
        const result = await request(app).
          post('/assets/list').
          set('Authorization', `Bearer ${token}`)
    
        expect(result.body).toEqual({
          status: 'ok',
          payload: [
            lastAsset, 
            anotherAsset, 
            asset
          ]
        })
    })
  
    it('filter by UUID', async () => {
        const asset = await createTestAsset('OUR_UUID', 1, 'firstAsset')
        await createTestAsset('OTHER_UUID', 2, 'secondAsset')
        await createTestAsset('LAST_UUID', 3, 'thirdAsset')
    
        const result = await request(app).
          post('/assets/list').
          send({ searchTerm: 'OUR_UUID' }).
          set('Authorization', `Bearer ${token}`)
    
        expect(result.body).toEqual({
          status: 'ok',
          payload: [
            asset
          ]
        })
    })
  
    it('filter by ID Origin', async () => {
        const anotherAsset = await createTestAsset('Oasset-retrieve.specTHER_UUID', 2, 'secondAsset')
        await createTestAsset('OUR_UUID', 1, 'firstAsset')
        await createTestAsset('LAST_UUID', 3, 'thirdAsset')
    
        const result = await request(app).
          post('/assets/list').
          send({ searchTerm: 'secondAsset' }).
          set('Authorization', `Bearer ${token}`)
    
        expect(result.body).toEqual({
          status: 'ok',
          payload: [
            anotherAsset
          ]
        })
    })
  
    it('filter by portfolio', async () => {
        const anotherAsset = await createTestAsset('OTHER_UUID', 2, 'secondAsset')
        await createTestAsset('OUR_UUID', 1, 'firstAsset')
        await createTestAsset('LAST_UUID', 3, 'thirdAsset')
    
        const result = await request(app).
          post('/assets/list').
          send({ portfolio: 'secondAsset' }).
          set('Authorization', `Bearer ${token}`)
    
        expect(result.body).toEqual({
          status: 'ok',
          payload: [
            anotherAsset
          ]
        })
    })
  
    it('filter by portfolio a filtered list by UUID with the same value', async () => {
        await createTestAsset('LAST_UUID', 2, 'secondAsset')
        await createTestAsset('OUR_UUID', 1, 'firstAsset')
        const lastAsset = await createTestAsset('LAST_UUID', 3, 'thirdAsset')
    
        const result = await request(app).
          post('/assets/list').
          send({ searchTerm: "LAST_UUID", portfolio: 'thirdAsset' }).
          set('Authorization', `Bearer ${token}`)
    
        expect(result.body).toEqual({
          status: 'ok',
          payload: [
            lastAsset
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