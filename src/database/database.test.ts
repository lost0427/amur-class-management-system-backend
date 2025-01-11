import pino from "pino";
import Database from "./index";
import {describe, it, beforeEach, before} from 'mocha'
import * as process from "node:process";
import * as assert from "node:assert";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE: string;
        }
    }
}

describe('DatabaseTest', () => {
    let db: Database

    before(() => {
        db = new Database({
            connectionString: process.env.DATABASE,
        }, pino())
    })

    it('should query', async () => {
        const result = await db.user_module.get_all_students();
        assert.ok(result);
    })


})