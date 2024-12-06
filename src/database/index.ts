import sqlite3, {OPEN_FULLMUTEX, OPEN_READWRITE} from 'sqlite3'
import UserModule from "./modules/UserModule";

export interface DatabaseConfig {
    db_file: string
}

export default class Database {
    private db: sqlite3.Database
    public user_module: UserModule

    constructor(database_config: DatabaseConfig) {
        const db = new sqlite3.Database(database_config.db_file, OPEN_READWRITE | OPEN_FULLMUTEX)
        db.serialize()
        this.db = db

        this.user_module = new UserModule(this.db)
    }

    public async close(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }
}