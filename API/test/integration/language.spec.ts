import app from '../../src/api'
import request from 'supertest'
import { format } from 'path'

describe('Language', () => {
    it('response to a locale', async () => {
        const result = await request(app)
          .post('/languages/get')
          .send({ language: 'es' })
        const parsed = result.body
    
        expect(result.statusCode).toEqual(200)
        expect(parsed.translation.loginForm.login).toEqual('Iniciar sesión')
      })

    it('response to a locale', async () => {
        const result = await request(app)
          .post('/languages/get')
          .send({ language: 'en' })
        const parsed = result.body
    
        expect(result.statusCode).toEqual(200)
        expect(parsed.translation.loginForm.login).toEqual('Login')
      })
})