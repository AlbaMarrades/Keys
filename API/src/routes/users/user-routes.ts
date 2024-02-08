import { Request, Response, Router } from 'express'
import { UserActions } from '../../actions/users/user-actions'

const UserRouter = Router()

UserRouter.post("/login", async (req: Request, res: Response) => {

    const username: string = req.body.username
    const password: string = req.body.password

    const found: any = UserActions.verifyUser(username, password)
    const { isLogged, token } = found

    let response: object = {
        status: 'ok',
        payload: token
    }

    if (!isLogged) {
        response = { status: 'ko', message: 'Usuario Incorrecto' }
    }

    res.send(response)
})

export default UserRouter