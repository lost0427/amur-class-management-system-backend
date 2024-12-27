import {FastifyPluginCallback} from 'fastify'
import session_apis from "./session";
import user_apis from './user'

const all_apis: FastifyPluginCallback = (fastify, opts, done) => {
    fastify.get('/', async (request, reply) => {
        return {status: 'ok'}
    })
    fastify.register(session_apis)
    fastify.register(user_apis)

    done()
}

export default all_apis