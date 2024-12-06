import sqlite3 from "sqlite3";

export default abstract class BasicDBModule {
    private db: sqlite3.Database

    public BasicDBModule(user_sqlite_db: sqlite3.Database) {
        // BasicDBModule constructor
        this.db = user_sqlite_db
    }

    public async DBRun(sql: string, params: Array<string | number>): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    public async DBGet<T>(sql: string, params: Array<string | number>): Promise<T | null> {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row?: T) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(row)
                }
            })
        })
    }

    public async DBAll<T>(sql: string, params: Array<string | number>): Promise<Array<T>> {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows: Array<T>) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

}