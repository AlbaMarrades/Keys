import Asset from "../../src/domain/asset"
import { DBClient } from "../../src/infrastructure/DBClient"
import AssetRepository from "../../src/services/assets/assetRepository"
import Assets from "../../src/services/assets/assets"

describe('About searching and updating Assets', () => {
    beforeAll(async () => { 
        DBClient.getInstance().connect() 
    })

    afterAll(async () => { 
        DBClient.getInstance().disconnect() 
    })

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

    it('can search by UUID', async () => {
        createUUID.mockReturnValue('OUR_UUID')
        await Assets.createAsset('anOwner', 'anOrigin', 'anPortfolio')

        const result = await Assets.searchUUID('OUR_UUID')

        expect(result).toMatchObject({ UUID: 'OUR_UUID' })
    })

    it('can search by UUID and throws a null asset when it doesnt exist', async () => {
        const result = await Assets.searchUUID("anyUUID")

        expect(result.isNull()).toBe(true)
    })

    it('can update an asset', async () => {
        createUUID.mockReturnValue('OUR_UUID')
        await Assets.createAsset('anOwner', 'anOrigin', 'anPortfolio')

        const result = await Assets.assetModification({
            owner: 'anOwner',
            origin: 'anOrigin',
            UUID: 'OUR_UUID',
            portfolio: 'changed'
        })

        expect(result).toMatchObject({ portfolio: 'changed' })
    })

    it('can not update an asset if doesnt exists', async () => {
        createUUID.mockReturnValue('ANOTHER_UUID')
        await Assets.createAsset('anOwner', 'anOrigin', 'aPortfolio')
   
        const result = await Assets.assetModification({
            owner: 'anOwner',
            origin: 'anOrigin',
            UUID: 'OUR_UUID',
            portfolio: 'changed'
        })

        expect(result).toMatchObject(Asset.null())
    })

    it('cant update when owner and origin already exists', async () => {
        createUUID.mockReturnValue('OUR_UUID')
        await Assets.createAsset('anOwner', 'anOrigin', 'aPortfolio')

        createUUID.mockReturnValue('ANOTHER_UUID')
        await Assets.createAsset('anOtherOwner', 'anOtherOrigin', 'anOtherPortfolio')

        const result = await Assets.assetModification({
            owner: 'anOwner',
            origin: 'anOrigin',
            UUID: 'ANOTHER_UUID',
            portfolio: 'changed'
        })
        
        expect(result.isNull()).toBe(true)
    })
})
