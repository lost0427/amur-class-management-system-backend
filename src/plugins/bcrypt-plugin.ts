import fp from 'fastify-plugin'
import {FastifyPluginCallback, FastifyPluginOptions} from "fastify";
import {compare, hash} from 'bcrypt'

const hash_round = 10

declare module 'fastify' {
    interface FastifyInstance {
        bcrypt_compare?: typeof compare;
        bcrypt_hash?: (password: string) => Promise<string>;
    }
}

export const bcrypt_hash = async (password: string) => hash(password, hash_round)

const bcrypt_plugin_func: FastifyPluginCallback = (fastify, options: FastifyPluginOptions, done): void => {
    // bcrypt_compare(myPlaintextPassword, hash)
    fastify.decorate('bcrypt_compare', compare)
    fastify.decorate('bcrypt_hash', bcrypt_hash)

    done()
}

export default fp(bcrypt_plugin_func)