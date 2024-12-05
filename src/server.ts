import Fastify, {FastifyInstance} from 'fastify'
import fastifyEnv from '@fastify/env';
import fastifyDBPlugin from './plugins/sqlite-plugin'
import routes from "./routes";

declare module 'fastify' {
    interface FastifyInstance {
        config: {
            DATABASE: string
            PORT: number
            HOST: string
        };
    }
}

const schema = {
    type: 'object',
    required: ['DATABASE'],
    properties: {
        PORT: {
            type: 'integer',
            default: 3100
        },
        HOST: {
            type: 'string',
            default: '127.0.0.1'
        },
        DATABASE: {
            type: 'string'
        }
    }
}

const options = {
    confKey: 'config', // optional, default: 'config'
    schema: schema,
}


async function main() {
    const server: FastifyInstance = Fastify({
        logger: true
    })

    await server.register(fastifyEnv, options)
    server.register(fastifyDBPlugin)
    server.register(routes, {prefix: '/api'})

    server.log.info(`Starting server on ${server.config.HOST}:${server.config.PORT}`)
    await server.listen({port: server.config.PORT, host: server.config.HOST})
}

main()