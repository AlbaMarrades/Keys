import { UsersService } from '../../../src/services/users/user-service'

describe('in the user service', () => {
    it('retrieve state true and role kind when it exists', () => {
        const result = UsersService.getUser('miriam', 'M1r14m_academy')

        expect(result.isLogged).toBe(true)
        expect(result.role).toBe('admin')
    })

    it('retrieve a true state when pass and user are correct', () => {
        const result = UsersService.getUser('randomMiriam', 'randomPass')

        expect(result.isLogged).toBe(false)
        expect(result.role).toBe('')
    })
})