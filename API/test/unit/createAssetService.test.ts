import Asset from "../../src/domain/asset"
import { DBClient } from "../../src/infrastructure/DBClient"
import AssetRepository from "../../src/services/assets/assetRepository"
import Assets from "../../src/services/assets/assets"

describe('About creating Assets', () => {
    beforeAll(async () => { DBClient.getInstance().connect() })
    afterAll(async () => { DBClient.getInstance().disconnect() })

    let retrieveTime: any
    let createUUID: any

    beforeEach(async () => {
        retrieveTime = jest.spyOn(Asset.prototype, "retrieveTime")
        createUUID = jest.spyOn(Asset.prototype, "createUUID")
        await AssetRepository.flush()
    })

    afterEach(() => {
        retrieveTime.mockRestore()
        createUUID.mockRestore()
    })

    it('can create new asset', async () => {
        const theAsset = await Assets.createAsset('anOwner', 'anOrigin', 'aPortfolio')

        expect(theAsset.isNull()).toBe(false)
    })

    it('can not create a duplicate asset', async () => {
        const owner: string = 'anOwner'
        const portfolio: string = 'aPortfolio'
        const origin: string = 'anOrigin'
        await Assets.createAsset(owner, origin, portfolio)

        const result: Asset = await Assets.createAsset(owner, origin, portfolio)

        expect(result.isNull()).toBe(true)
    })
})
