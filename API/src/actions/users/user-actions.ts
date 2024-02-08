import JwtVerifier from "../../infrastructure/jwtVerifier"
import { UsersService } from "../../services/users/user-service"
import { TokenResponse } from "../../shared/tokenResponse"

export class UserActions {

    public static verifyUser(username: string, password: string): object {
        const user: TokenResponse = UsersService.getUser(username, password)
        const token = JwtVerifier.createToken(username, user.role)

        const response = {
            isLogged: user.isLogged,
            token: token
        }

        return response
    }
}