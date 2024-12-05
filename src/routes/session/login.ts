import {FastifyPluginCallback} from "fastify";

const login_api: FastifyPluginCallback = (fastify, opts, done) => {
    fastify.post('/login', async (request, reply) => {
        return {status: 'ok'}
    })

    done()
}

export default login_api