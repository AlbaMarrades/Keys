import Asset from "../../src/domain/asset"
import { DBClient } from "../../src/infrastructure/DBClient"
import AssetRepository from "../../src/services/assets/assetRepository"
import Assets from "../../src/services/assets/assets"

describe('Asset Service', () => {
    beforeAll(async () => { 
        DBClient.getInstance().connect() 
    })

    afterAll(async () => { 
        DBClient.getInstance().disconnect() 
    })

    let retrieveTime:any 
    let createUUID:any 
    
    beforeEach(async () => {
        retrieveTime = jest.spyOn(Asset.prototype, "retrieveTime")
        createUUID = jest.spyOn(Asset.prototype, "createUUID")
        await AssetRepository.flush()
    })

    afterEach(()=>{
        retrieveTime.mockRestore()
        createUUID.mockRestore()
    })

    it('can retrieve all the assets in the collection ', async() => {
        retrieveTime.mockReturnValue(1)
        createUUID.mockReturnValue('OUR_UUID')
        
        await Assets.createAsset('anOwner', 'anOrigin', 'aPortfolio')
        
        expect(await Assets.filter()).toEqual(
            [{
                origin: "anOrigin", owner: "anOwner",
                portfolio: "aPortfolio", timestamp: 1, UUID: "OUR_UUID"
            }])
    })

    it('can order two assets by their timestamp ', async () => {
        retrieveTime.mockReturnValue(2)
        createUUID.mockReturnValue('OUR_UUID')
        
        await Assets.createAsset('anOwner', 'anOrigin', 'aPortfolio')

        retrieveTime.mockReturnValue(1)
        createUUID.mockReturnValue('OTHER_UUID')
        
        await Assets.createAsset('anotherOwner', 'anotherOrigin', 'anotherPortfolio')

        expect(await Assets.filter()).toMatchObject([{ timestamp: 2 }, { timestamp: 1 }])
    })
})
