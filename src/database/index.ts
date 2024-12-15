import {ClientConfig, Pool} from "pg";
import {Logger} from 'pino'
import UserModule from "./modules/UserModule";
import ExamModule from "./modules/ExamModule";

export default class Database {
    private readonly db: Pool
    public user_module: UserModule
    public exam_module: ExamModule

    constructor(db_config: ClientConfig, logger: Logger) {
        this.db = new Pool(db_config)

        this.user_module = new UserModule(this.db, logger)
        this.exam_module = new ExamModule(this.db, logger)
    }

    public async close(): Promise<void> {
        await this.db.end()
    }
}