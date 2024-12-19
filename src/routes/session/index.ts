import {FastifyPluginCallback} from 'fastify'
import {fastifySession} from '@fastify/session';
import {fastifyCookie} from '@fastify/cookie';
import {Admin, Student} from "models/user";
import login_logout from "./login-logout";

declare module "fastify" {
    interface Session {
        student?: Student
        admin?: Admin
    }
}

const session_apis: FastifyPluginCallback = (fastify, opts, done) => {
    fastify.register(fastifyCookie)
    fastify.register(fastifySession, {
        secret: fastify.config.SESSION_SECRET,
        cookieName: 'session_id',
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
    fastify.register(login_logout)

}

export default session_apis