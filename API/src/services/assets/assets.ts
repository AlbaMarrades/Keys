import Asset from "../../domain/asset"
import { AssetDescription } from "../../shared/assetDescription"
import AssetRepository from "./assetRepository"

export default class Assets {
    public static async createAsset(owner: string, origin: string, portfolio: string): Promise<Asset> {
        const asset: Asset = new Asset(owner, origin)
        asset.setPortfolio(portfolio)
        return await AssetRepository.save(asset)
    }

    public static async searchUUID(UUID: string): Promise<Asset> {
        const result = await AssetRepository.selectAsset(UUID)
        return result
    }

    public static async assetModification(data: AssetDescription): Promise<Asset> {
        return await AssetRepository.update(data)
    }

    public static async filter(searchTerm?: string, portfolio?: string, owner?: string): Promise<Array<Asset>> {
        const result: Asset[] = await AssetRepository.filter(searchTerm, portfolio, owner)
        return result.sort((first, last): number => {
            return first.compareAge(last)
        })
    }

    public static async listPortfolios(): Promise<Array<string>> {
        const result = await AssetRepository.listPortfolio()
        const ordered = result.filter(portfolio => portfolio != '')
        return ordered
    }

    public static async listOwners(): Promise<Array<string>> {
        const result = await AssetRepository.listOwner()
        return result
    }
}