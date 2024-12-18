import {FastifyPluginCallback} from "fastify";
import {hash, compare} from 'bcrypt'


const login_api: FastifyPluginCallback = (fastify, opts, done) => {
    fastify.post('/login', async (request, reply) => {
        return {status: 'ok'}
    })

    done()
}

export default login_api