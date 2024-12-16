import {Pool, PoolClient} from "pg";
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

    /**
     * 使用事务执行回调逻辑
     * @param callback 回调函数，接受一个client对象，用于执行数据库操作
     */
    public async client_transaction(callback: (client: PoolClient) => Promise<void>): Promise<void> {
        const client = await this.db_pool.connect();
        try {
            await client.query('BEGIN'); // 开始事务
            await callback(client); // 执行回调函数
            await client.query('COMMIT'); // 提交事务
        } catch (err) {
            await client.query('ROLLBACK'); // 回滚事务
            this.log.error('Transaction failed:', err);
            throw err;
        } finally {
            client.release(); // 释放客户端连接
        }
    }
}


