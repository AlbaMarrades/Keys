import Asset from "../../src/domain/asset"

describe('Test for Asset class', () => {
    it('we can create a asset without portfolio', () => {
        const owner: string = 'anOwner'
        const origin: string = 'anOrigin'

        const asset: Asset = new Asset(owner, origin)
        const result: Object = asset.toJson()

        expect(result)
            .toMatchObject({
                owner: owner,
                portfolio: '',
                origin: origin,
            })
    })

    it('we can set portfolio to asset that exist', () => {
        const owner: string = 'anOwner'
        const origin: string = 'anOrigin'
        const portfolio: string = 'aPortfolio'
        const asset: Asset = new Asset(owner, origin)
        asset.setPortfolio(portfolio)
        const result: Object = asset.toJson()

        expect(result)
            .toMatchObject({
                owner: owner,
                portfolio: portfolio,
                origin: origin,
            })
    })

    it('sets an UUID', () => {
        const ourUUID = 'OUR_UUID'
        Asset.prototype.createUUID = jest.fn().mockReturnValue(ourUUID)

        const owner: string = 'anOwner'
        const origin: string = 'anOrigin'

        const asset: Asset = new Asset(owner, origin)
        const result: Object = asset.toJson()

        expect(result)
            .toMatchObject(
                { UUID: ourUUID })

    })

    it('sets an timestamp', () => {
        const ourTimestamp = 1111111111
        Asset.prototype.retrieveTime = jest.fn().mockReturnValue(ourTimestamp)

        const owner: string = 'anOwner'
        const origin: string = 'anOrigin'

        const asset: Asset = new Asset(owner, origin)
        const result: Object = asset.toJson()

        expect(result)
            .toMatchObject(
                { timestamp: ourTimestamp })

    })

    it('Can be compared', () => {
        const owner: string = 'anOwner'
        const origin: string = 'anOrigin'

        const asset: Asset = new Asset(owner, origin)
        const anotherAsset: Asset = new Asset(owner, origin)

        expect(asset.isEqual(anotherAsset)).toBe(true)
    })

    it('Can be compared by UUID', () => {
        const owner: string = 'anOwner'
        const origin: string = 'anOrigin'
        const ourUUID = 'OUR_UUID'
        Asset.prototype.createUUID = jest.fn().mockReturnValue(ourUUID)
        const asset: Asset = new Asset(owner, origin)

        expect(asset.sameUUID(ourUUID)).toBe(true)
    })


})