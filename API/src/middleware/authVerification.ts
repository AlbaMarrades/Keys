import { Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import JwtVerifier from '../infrastructure/jwtVerifier'

function adminVerification(req: Request, res: Response, next: any): void {
    try {
        if (verification(extractToken(req), 'admin')) next()
        else sendError(res)
    } catch (error) { sendError(res) }
}

function loginVerification(req: Request, res: Response, next: any): void {
    try {
        if (verification(extractToken(req), '')) next()
        else sendError(res)
    } catch (error) {
        sendError(res)
    }
}

function parserToken(token: string): string {
    return token.split(' ')[1]
}

function notAuth(): object {
    return { ok: false, error: "Usuario No Autorizado" }
}

function verification(token: string, requiredRole: string): boolean {
    const verifiedToken: JwtPayload = JwtVerifier.verifyToken(token)
    if (JwtVerifier.isAdmin(verifiedToken)) return true
    if (verifiedToken) return true
    return false
}

function extractToken(req: Request): string {
    const token: string = "" + req.headers.authorization
    const auth: string = parserToken(token)
    return auth
}

function sendError(res: Response): void {
    const message: object = notAuth()
    res.send(message)
}

export default { adminVerification, loginVerification }


