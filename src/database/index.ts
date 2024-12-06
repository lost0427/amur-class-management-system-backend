import sqlite3, {OPEN_FULLMUTEX, OPEN_READWRITE} from 'sqlite3'

export interface DatabaseConfig {
    db_file: string
}

export default class Database {
    private db: sqlite3.Database

    public Database(database_config: DatabaseConfig) {
        const db = new sqlite3.Database(database_config.db_file, OPEN_READWRITE | OPEN_FULLMUTEX)
        db.serialize()
    }

    public async close(): Promise<void> {

    }
}