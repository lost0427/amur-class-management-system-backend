import fp from 'fastify-plugin'
import Database from "database";
import {FastifyPluginCallback, FastifyPluginOptions} from "fastify";

declare module 'fastify' {
    interface FastifyInstance {
        db?: Database;
    }
}

const pgsql_plugin_func: FastifyPluginCallback = (fastify, options: FastifyPluginOptions, done): void => {
    if (!fastify.db) {
        const db = new Database({connectionString: fastify.config.DATABASE}, fastify.log)
        fastify.decorate('db', db)

        fastify.addHook('onClose', (fastify, done) => {
            fastify.db.close().then(() => {
                done()
            }).catch((err) => {
                done(err)
            })
        })
    }

    done()
}

export default fp(pgsql_plugin_func)