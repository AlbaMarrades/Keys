import { Request, Response, Router } from 'express'
import { t } from 'i18next'
import { AssetActions } from '../../actions/assets/asset-actions'
import { AssetDescription } from '../../shared/assetDescription'
import authVerification from '../../middleware/authVerification'

const AssetRouter = Router()

AssetRouter.use(authVerification.loginVerification)

AssetRouter.post('/new', authVerification.adminVerification, async (req: Request, res: Response) => {
    let result: object = { status: 'ok' }
    const owner: string = req.body.owner
    const portfolio: string = req.body.portfolio
    const origin: string = req.body.origin
    try {
        await AssetActions.newAsset(owner, origin, portfolio)
    } catch {
        result = { status: 'ko', message: t('error.assetExists') }
    }
    res.send(result)
})

AssetRouter.post('/edit', authVerification.adminVerification, async (req: Request, res: Response) => {
    let result: object = { status: 'ok' }
    const data: AssetDescription = {
        owner: req.body.owner,
        portfolio: req.body.portfolio,
        origin: req.body.origin,
        UUID: req.body.UUID
    }

    try {
        await AssetActions.modifyAsset(data)
    } catch {
        result = { status: 'ko', message: t('error.assetExists') }
    }

    res.send(result)
})

AssetRouter.get('/retrieve/:UUID', async (req: Request, res: Response) => {
    const UUID: string = req.params.UUID
    let result: object

    try {
        result = { status: 'ok', payload: await AssetActions.retrieveAsset(UUID) }
    } catch (error) {
        result = { status: 'ko', message: t("error.noId") }
    }

    res.send(result)
})

AssetRouter.post('/list', async (req: Request, res: Response) => {
    const searchTerm: string = req.body.searchTerm
    const portfolio: string = req.body.portfolio
    const owner: string = req.body.owner

    const list = await AssetActions.searchAssets(searchTerm, portfolio, owner)
    const result: object = {
        status: 'ok',
        payload: list
    }
    res.send(result)
})

AssetRouter.get('/portfolios', async (req: Request, res: Response) => {
    const portfolios: Array<string> = await AssetActions.listPortfolios()
    const result: object = {
        status: 'ok',
        payload: portfolios
    }
    res.send(result)
})

AssetRouter.get('/owners', async (req: Request, res: Response) => {
    const owners: Array<string> = await AssetActions.listOwners()
    const result: object = {
        status: 'ok',
        payload: owners
    }
    res.send(result)
})


export default AssetRouter
