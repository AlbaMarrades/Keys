import request from 'supertest'
import app from "../../../src/api"
import JwtVerifier from '../../../src/infrastructure/jwtVerifier'

describe('Login test', () => {

    it('the route exists', async () => {
        const result = await request(app).post('/users/login')
        expect(result.statusCode).toEqual(200)
    })

    it('return message error when the user does not exist', async () => {
        const user = { username: 'wrongUser', password: "wrongPassword" }
        const result = await request(app)
            .post('/users/login')
            .send(user)

        expect(result.body.status).toBe('ko')
        expect(result.body.message).toBe('Usuario Incorrecto')
    })

    it('return true and token when the user exists', async () => {
        const user = { username: 'hugo', password: "Hug0_academy" }

        const token = 'falseToken'
        JwtVerifier.createToken = jest.fn().mockReturnValue(token)

        const result = await request(app)
            .post('/users/login')
            .send(user)

        expect(result.statusCode).toEqual(200)
        expect(result.body.status).toBe('ok')
        expect(result.body.payload).toBe('falseToken')
    })
})