import Asset from "../../src/domain/asset"
import { DBClient } from "../../src/infrastructure/DBClient"
import AssetRepository from "../../src/services/assets/assetRepository"
import Assets from "../../src/services/assets/assets"

describe('Test list by portfolio', () => {
    beforeAll(async () => { 
        DBClient.getInstance().connect() 
    })
    
    afterAll(async () => { 
        DBClient.getInstance().disconnect() 
    })

    beforeEach(async () => {
        await AssetRepository.flush()
    })

    it('send the list', async () => {
        await Assets.createAsset("a Owner", "a Origin", "a Portfolio")
        await Assets.createAsset("b Owner", "b Origin", "b Portfolio")

        const result: Object = await Assets.listPortfolios()

        expect(result).toEqual(["a Portfolio", "b Portfolio"])
    })

    it('send the list with repeated portfolio', async () => {
        await Assets.createAsset("a Owner", "a Origin", "a Portfolio")
        await Assets.createAsset("b Owner", "b Origin", "a Portfolio")
        await Assets.createAsset("c Owner", "c Origin", "c Portfolio")

        const result: Object = await Assets.listPortfolios()

        expect(result).toEqual(["a Portfolio", "c Portfolio"])
    })
})

describe('List by owner', () => {
    beforeAll(async () => { 
        DBClient.getInstance().connect() 
    })

    afterAll(async () => {
         DBClient.getInstance().disconnect() 
        })

    beforeEach(async () => {
        await AssetRepository.flush()
    })

    it('send the list', async () => {
        await Assets.createAsset("a Owner", "a Origin", "a Portfolio")
        await Assets.createAsset("b Owner", "b Origin", "b Portfolio")

        const result: Object = await Assets.listOwners()

        expect(result).toEqual(["a Owner", "b Owner"])
    })

    it('send the list with repeated owner', async () => {
        await Assets.createAsset("a Owner", "a Origin", "a Portfolio")
        await Assets.createAsset("a Owner", "b Origin", "a Portfolio")
        await Assets.createAsset("c Owner", "c Origin", "c Portfolio")

        const result: Object = await Assets.listOwners()

        expect(result).toEqual(["a Owner", "c Owner"])
    })
})

describe('Searching', () => {
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

    it('send the all list when there is not filter criteria', async () => {
        const list = await createList()

        const filteredList: Asset[] = await Assets.filter()

        expect(filteredList).toMatchObject([list.c, list.b, list.a])
    })

    it('can search by origin', async () => {
        const list = await createList()

        const term: string = 'c origin'
        const filteredList: Asset[] = await Assets.filter(term, undefined, undefined)

        expect(filteredList).toMatchObject([list.c])
    })

    it('can search by UUID', async () => {
        const list = await createList()

        const term: string = 'c UUID'
        const filteredList: Asset[] = await Assets.filter(term, undefined, undefined)

        expect(filteredList).toMatchObject([list.c])
    })

    it('can search by portfolio', async () => {
        const list = await createList()
        const portfolio: string = 'a'

        const filteredList: Asset[] = await Assets.filter(
            undefined, portfolio, undefined)

        expect(filteredList).toMatchObject([list.b, list.a])
    })

    it('can search by term and portfolio', async () => {
        const list = await createList()

        const searchTerm: string = 'a'
        const portfolio: string = 'a'

        const filteredList: Array<Asset> = await Assets.filter(
            searchTerm, portfolio, undefined)

        expect(filteredList).toMatchObject([list.a])
    })

    it('can search by owner', async () => {
        const list = await createList()
        const owner: string = 'c'
        let filteredList: Array<Asset> = await Assets.filter(
            undefined, undefined, owner)

        expect(filteredList).toMatchObject([list.c])
    })

    it('can combine search terms ', async () => {
        const list = await createList()

        const searchTerm: string = 'b origin'
        const portfolio: string = 'a'
        const owner: string = 'a'
        let filteredList: Array<Asset> = await Assets.filter(
            searchTerm, portfolio, owner)

        expect(filteredList).toMatchObject([list.b])
    })

    async function createList() {
        createUUID.mockReturnValue('a UUID')
        const assetA: Asset = await Assets.createAsset("a owner", "a origin", "a portfolio")
        createUUID.mockReturnValue('b UUID')
        const assetB: Asset = await Assets.createAsset("a owner", "b origin", "a portfolio")
        createUUID.mockReturnValue('c UUID')
        const assetC: Asset = await Assets.createAsset("c owner", "c origin", "c portfolio")

        return { a: assetA, b: assetB, c: assetC }
    }
})
