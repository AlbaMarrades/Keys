import { Request, Response, Router } from 'express'
import { ConfigurationActions } from '../../actions/configuration/configuration-actions'

const ConfigurationRouter = Router()

ConfigurationRouter.get('/configuration/name', (req: Request, res: Response) => {
    const name: string = ConfigurationActions.retrieveName()
    res.send(name)
})

export default ConfigurationRouter
