import {FastifyPluginCallback} from 'fastify'

const api_func: FastifyPluginCallback = (fastify, opts, done) => {
    fastify.get('/', async (request, reply) => {
        return {status: 'ok'}
    })
    done()
}

export default api_func