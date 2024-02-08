import { JwtHelperService } from '@auth0/angular-jwt'

export class Token {

    static jwtHelper: JwtHelperService = new JwtHelperService()

    static delete(): void {
        localStorage.removeItem('TOKEN')
    }

    static isValid(): boolean {
        const token = localStorage.getItem('TOKEN')
        return (token != '' && token != null)
    }

    public static decode(): object {
        const token = localStorage.getItem('TOKEN')!
        let user: object = {}
        if (token) {
            user = this.jwtHelper.decodeToken(token)
        }
        return user
    }

    static getRole(): string {
        const userInfo: any = this.decode()
        return userInfo['role']
    }

    static getUsername(): string {
        const userInfo: any = this.decode()
        return userInfo['user']
    }

    static set(token: string): void {
        localStorage.setItem('TOKEN', token)
    }

    static get(): string {
        return localStorage.getItem('TOKEN')!
    }

    static getExpirationDate(token: string): Date {
        return this.jwtHelper.getTokenExpirationDate(token)!
    }

    static getExpirationHour(date: Date): string {
        return date.toString().split(' ')[4]
    }

    static isExpired(token: string): boolean {
        return this.jwtHelper.isTokenExpired(token)
    }
}