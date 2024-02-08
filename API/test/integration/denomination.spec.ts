import app from '../../src/api'
import request from 'supertest'

describe('endpoints api test', () => {
  it('anwers name and version', async () => {
    const result = await request(app).get('/configuration/name')
    expect(result.text).toBe('Keys 1.0.0')
  })
})
