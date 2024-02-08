import request from 'supertest'
import app from "../../../src/api"
import { DBClient } from '../../../src/infrastructure/DBClient'
import AssetRepository from '../../../src/services/assets/assetRepository'

describe('Test assets/new', () => {
    let token = ''
    
    beforeAll(async () => {
        DBClient.getInstance().connect()
        token = await createToken('miriam', 'M1r14m_academy')
    })

    afterAll(async () => { DBClient.getInstance().disconnect() })

    afterEach(async () => {
        await AssetRepository.flush()
    })

    it('the route exists', async () => {
        const result = await request(app).post('/assets/new').set('Authorization', `Bearer ${token}`)
        expect(result.statusCode).toEqual(200)
    })

    it('returns the new asset', async () => {
        const asset: Object = { owner: "anOwner", origin: "anOrigin" }

        const result = await request(app).
          post('/assets/new').
          send(asset).
          set('Authorization', `Bearer ${token}`)

        expect(result.body).toMatchObject({ status: 'ok' })
    })

    it('returns error when the asset exits', async () => {
        const asset: Object = { owner: "anOwner", origin: "anOrigin" }

        await request(app).
          post('/assets/new').
          send(asset).
          set('Authorization', `Bearer ${token}`)

        const result = await request(app).
          post('/assets/new').
          send(asset).
          set('Authorization', `Bearer ${token}`)

        expect(result.body).toMatchObject({ status: 'ko', message: 'Ya existe el activo' })
    })
})

const createToken = async (username: string, password: string) => {
    const response = await request(app).post('/users/login').send({ username, password })
    return response.body.payload
}

