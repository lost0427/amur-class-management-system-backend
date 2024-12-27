import {FastifyPluginCallback} from 'fastify'
import SessionAPI from "./session";

const all_apis: FastifyPluginCallback = (fastify, opts, done) => {
    fastify.get('/', async (request, reply) => {
        return {status: 'ok'}
    })
    fastify.register(SessionAPI)


    done()
}

export default all_apis