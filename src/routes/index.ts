import {FastifyPluginCallback} from 'fastify'

const all_apis: FastifyPluginCallback = (fastify, opts, done) => {
    fastify.get('/', async (request, reply) => {
        return {status: 'ok'}
    })



    done()
}

export default all_apis