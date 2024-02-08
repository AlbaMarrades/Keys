import Asset from "../../domain/asset"
import { DBClient } from "../../infrastructure/DBClient"
import { AssetDescription } from "../../shared/assetDescription"

export default class AssetRepository {

    static collection() {
        return DBClient.getCollection('assets')
    }

    static async flush(): Promise<void> {
        await this.collection().deleteMany({})
    }

    static async save(asset: Asset): Promise<Asset> {
        if (await this.checkDuplication(asset)) return Asset.null()

        await this.collection().insertOne(asset)
        return await this.selectAsset(asset.getUUID())
    }

    static async checkDuplication(asset: Asset): Promise<boolean> {
        const found = await this.collection().findOne({
            origin: asset.getOrigin(),
            owner: asset.getOwner()
        })

        return (found != null)
    }

    static async update(data: AssetDescription): Promise<Asset> {
        const found = await this.selectAsset(data.UUID!)
        const theAsset: Asset = Asset.fromData(found)
        if (theAsset.isNull()) return theAsset

        const repeatedAsset = await this.isRepeated(data)
        if (repeatedAsset) return Asset.null()

        await this.collection().updateOne({ UUID: data.UUID }, {
            $set: {
                origin: data.origin,
                owner: data.owner,
                portfolio: data.portfolio
            }
        })
        const result: Asset = await this.selectAsset(data.UUID!)
        return Asset.fromData(result)
    }

    static async isRepeated(data: AssetDescription): Promise<boolean> {
        const repeatedAsset = await this.collection().findOne({
            owner: data.owner,
            origin: data.origin,
            UUID: { $ne: data.UUID }
        })

        return (repeatedAsset != null)
    }

    static async selectAsset(UUID: string): Promise<Asset> {
        let result: any = await this.collection().findOne({ UUID }, { projection: { _id: false } })
        if (!result) result = Asset.null()
        return Asset.fromData(result)
    }

    static async filter(searchTerm: string = '', portfolio: string = '', owner: string = ''): Promise<Asset[]> {
        const criteria = await this.constructCriteria(searchTerm, portfolio, owner)

        const result: any[] = await this.collection().find(criteria, { projection: { _id: false } }).toArray()
        const assetResult: Asset[] = result.map(asset => Asset.fromData(asset))
        return assetResult
    }

    static async listPortfolio(): Promise<Array<string>> {
        const result: Array<string> = await this.collection().distinct('portfolio')
        return result
    }

    static async listOwner(): Promise<Array<string>> {
        const result: Array<string> = await this.collection().distinct('owner')
        return result
    }

    private static async constructCriteria(searchTerm: string = '', portfolio: string = '', owner: string = ''): Promise<object> {
        const term = `.*${searchTerm}.*`
        const byTerm = {
            $or: [
                { origin: { $regex: term } },
                { UUID: { $regex: term } }
            ]
        }

        const thePortfolio = `.*${portfolio}.*`
        const byPortfolio = {
            portfolio: { $regex: thePortfolio }
        }

        const theOwner = `.*${owner}.*`
        const byOwner = {
            owner: { $regex: theOwner }
        }

        const criteria = {
            $and: [
                byTerm,
                byPortfolio,
                byOwner
            ]
        }

        return criteria
    }
}
