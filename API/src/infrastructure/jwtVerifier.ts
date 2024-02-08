import jwt, { JwtPayload } from 'jsonwebtoken'
import Settings from './settings'

export default class JwtVerifier {

    private static readonly SECRET = Settings.secretKey()

    static createToken(username: string, role: string): string {
        const payload = {
            user: username,
            tokenCreationDate: new Date().getTime(),
            role: role
        }

        return jwt.sign(payload, this.SECRET, { expiresIn: '5m' })
    }

    static verifyToken(token: string): JwtPayload {
        return jwt.verify(token, this.SECRET) as JwtPayload
    }

    static isAdmin(auth: JwtPayload): boolean {
        return auth.role == 'admin'
    }

}