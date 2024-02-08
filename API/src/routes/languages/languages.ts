import { Request, Response, Router } from 'express'
import { i18n } from 'i18next'

const LanguagesRouter = Router()

LanguagesRouter.post("/get", async (req: Request, res: Response) => {
    const selected: string = req.body.language
    const translator: i18n = req.i18n

    translator.changeLanguage(selected)

    res.send(translator.getDataByLanguage(selected))
})

export default LanguagesRouter