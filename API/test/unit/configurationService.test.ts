import Configuration from '../../src/services/configuration/configuration'

describe('Configuration Service', () => {
    it('retrieves name and version', () => {
        const name: string = new Configuration().retrieveDenomination()
        expect(name).toBe('Keys 1.0.0')
    })
})
