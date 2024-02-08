import { users } from "./user-repository"
import { TokenResponse } from "../../shared/tokenResponse"

export class UsersService {

    public static getUser(username: string, password: string): TokenResponse {
        let isLogged: boolean = false
        let role: string = ""

        users.forEach((user: any) => {
            if (user.username == username && user.password == password) {
                isLogged = true
                role = user.role
            }
        })

        return { isLogged, role }
    }
}