import { Collection, MongoClient } from 'mongodb'
import Settings from './settings'

export type DBCollection = Collection

export class DBClient {
    private static instance: DBClient
    private static URL: string = Settings.dbUri()
    private static databaseName: string = Settings.dbName()
    private static client: MongoClient

    private constructor() {
        DBClient.client = new MongoClient(DBClient.URL)
    }

    public static getInstance(): DBClient {
        if(!DBClient.instance) {
            DBClient.instance = new DBClient()
        }

        return DBClient.instance
    }

    public async connect(): Promise<void> {
        await DBClient.client.connect()
    }

    public static getCollection(collectionName: string): Collection {
        const database = DBClient.client.db(DBClient.databaseName)
        return database.collection(collectionName)
    }

    public async disconnect(): Promise<void> {
        await DBClient.client.close()
    }

    public async reset(): Promise<void> {
        await DBClient.client.db(DBClient.databaseName).dropDatabase()
    }
}
