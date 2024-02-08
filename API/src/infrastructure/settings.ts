export default class Settings {

    static dbUri(): string {
        return 'mongodb://mongo_keys:27017'
    }

    static dbName(): string {
        return 'keys'
    }

    static atTestingMode():boolean{
        return process.env.NODE_ENV == 'test'
    }

    static secretKey():string{
        return process.env.JWT_KEY!
    }
}
