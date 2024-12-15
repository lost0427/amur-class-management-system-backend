import {Pool} from "pg";
import {Logger} from 'pino'

export default abstract class BasicDBModule {
    private db_pool: Pool
    private log: Logger

    constructor(pg_pool: Pool, server_logger: Logger) {
        // BasicDBModule constructor
        this.db_pool = pg_pool
        this.log = server_logger
        this.db_pool.on('error', (err, client) => {
            this.log.error('Unexpected error on idle client', err)
            process.exit(-1)
        })
    }

    public async query<T>(sql: string, params: Array<string | number> = []): Promise<T[]> {
        this.log.debug(`Receive database query: ${sql}`)
        return (await this.db_pool.query(sql, params)).rows
    }

    public async query_one<T>(sql: string, params: Array<string | number> = []): Promise<T> {
        this.log.debug(`Receive database query: ${sql}`)
        return (await this.db_pool.query(sql, params)).rows[0]
    }
}