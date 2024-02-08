import { v4 as uuidv4 } from 'uuid'
import { NIL as NIL_UUID } from 'uuid'

export default class Asset {

    private owner: string
    private origin: string
    private portfolio: string = ''
    private UUID: string = NIL_UUID
    private timestamp: number

    public static fromData(data: Asset): Asset {
        if (data.UUID == '') return Asset.null()
        const theAsset = new Asset(data.owner, data.origin)
        theAsset.UUID = data.UUID
        theAsset.timestamp = data.timestamp
        theAsset.portfolio = data.portfolio
        return theAsset
    }

    constructor(owner: string, origin: string) {
        this.owner = owner
        this.origin = origin
        this.timestamp = this.retrieveTime()
        this.UUID = this.createUUID()
    }

    public static null(): Asset {
        return new NullAsset('', '')
    }

    toJson(): Object {
        return {
            owner: this.owner,
            portfolio: this.portfolio,
            origin: this.origin,
            UUID: this.UUID,
            timestamp: this.timestamp
        }
    }

    isEqual(asset: Asset): boolean {
        const sameOrigin: boolean = (this.origin == asset.origin)
        const sameOwner: boolean = (this.owner == asset.owner)

        return sameOrigin && sameOwner
    }

    compareAge(last: Asset): number {
        return last.timestamp - this.timestamp
    }

    sameUUID(UUID: string): boolean {
        return this.UUID == UUID
    }

    createUUID(): string {
        return uuidv4()
    }

    retrieveTime(): number {
        return new Date().getTime()
    }

    setOwner(newOwner: string): void {
        this.owner = newOwner
    }

    setOrigin(newOrigin: string): void {
        this.origin = newOrigin
    }

    setPortfolio(portfolio: string): void {
        this.portfolio = portfolio
    }

    getPortfolio(): string {
        return this.portfolio
    }

    getUUID(): string {
        return this.UUID
    }

    getOwner(): string {
        return this.owner
    }

    getOrigin(): string {
        return this.origin
    }

    isNull(): boolean {
        return false
    }
}

export class NullAsset extends Asset {

    constructor(owner: string, origin: string) {
        super('', '')
    }

    toJson(): Object {
        return {}
    }

    isEqual(asset: Asset): boolean {
        return false
    }

    compareAge(last: Asset): number {
        return 0
    }

    sameUUID(UUID: string): boolean {
        return false
    }

    createUUID(): string {
        return ""
    }

    retrieveTime(): number {
        return 0
    }

    setOwner(newOwner: string): void { }

    setOrigin(newOrigin: string): void { }

    setPortfolio(portfolio: string): void { }

    getPortfolio(): string {
        return ''
    }

    getOwner(): string {
        return ''
    }

    getOriginAndUUID(): string {
        return ''
    }

    isNull(): boolean {
        return true
    }
}