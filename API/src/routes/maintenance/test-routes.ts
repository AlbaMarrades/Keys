import { Request, Response, Router } from "express"
import AssetRepository from "../../services/assets/assetRepository"

const TestRouter = Router()

TestRouter.get('/flush', async (req: Request, res: Response) => {
    await AssetRepository.flush()
    res.send('')
})

export default TestRouter