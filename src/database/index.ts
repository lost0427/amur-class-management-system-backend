import {ClientConfig, Pool} from "pg";
import {BaseLogger} from 'pino'
import UserModule from "./modules/UserModule";
import ExamModule from "./modules/ExamModule";
import ScoreModule from "./modules/ScoreModule";

export default class Database {
    private readonly db: Pool
    public user_module: UserModule
    public exam_module: ExamModule
    public score_module: ScoreModule

    constructor(db_config: ClientConfig, logger: BaseLogger) {
        this.db = new Pool(db_config)

        this.user_module = new UserModule(this.db, logger)
        this.exam_module = new ExamModule(this.db, logger)
        this.score_module = new ScoreModule(this.db, logger)
    }

    public async close(): Promise<void> {
        await this.db.end()
    }
}