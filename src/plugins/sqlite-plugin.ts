'use strict'

import fp from 'fastify-plugin'
import sqlite3, {OPEN_FULLMUTEX, OPEN_READWRITE} from 'sqlite3'
import {FastifyPluginCallback, FastifyPluginOptions} from "fastify";

// This is a plugin that will add a sqlite3 database connection to Fastify
// Define a new datatype FastifyInstanceDB that extends FastifyInstanceBase

declare module 'fastify' {
    interface FastifyInstance {
        db?: sqlite3.Database;
    }
}

const sqlite_plugin_func: FastifyPluginCallback = (fastify, options: FastifyPluginOptions, done): void => {
    if (!fastify.db) {
        const db = new sqlite3.Database(fastify.config.DATABASE, OPEN_READWRITE | OPEN_FULLMUTEX)
        db.serialize()
        fastify.decorate('db', db)

        fastify.addHook('onClose', (fastify, done) => {
            fastify.db.close(done)
        })
    }

    done()
}

export default fp(sqlite_plugin_func)