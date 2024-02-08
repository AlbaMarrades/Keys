import Asset from "../../domain/asset"
import Assets from "../../services/assets/assets"
import { AssetDescription } from "../../shared/assetDescription"

export class AssetActions {

    public static async newAsset(owner: string, origin: string, portfolio: string): Promise<void> {
        const result: Asset = await Assets.createAsset(owner, origin, portfolio)
        if (result.isNull()) throw new Error()
    }

    public static async modifyAsset(data: AssetDescription): Promise<void> {
        const result: Asset = await Assets.assetModification(data)
        if (result.isNull()) throw new Error()
    }

    public static async retrieveAsset(UUID: string): Promise<Object> {
        const result: Asset = await Assets.searchUUID(UUID)
        if (result.isNull()) throw new Error()
        return result.toJson()
    }

    public static async searchAssets(searchTerm: string, portfolio: string, owner: string): Promise<Object> {
        const result = await Assets.filter(searchTerm, portfolio, owner)
        return result
    }

    public static async listPortfolios(): Promise<Array<string>> {
        return await Assets.listPortfolios()
    }

    public static async listOwners(): Promise<Array<string>> {
        return await Assets.listOwners()
    }
}


