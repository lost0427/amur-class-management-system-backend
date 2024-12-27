import {FastifyPluginCallback} from "fastify";
import {User} from "models/user";
import {Type} from '@sinclair/typebox'
import {TypeBoxTypeProvider} from "@fastify/type-provider-typebox";


const login_api: FastifyPluginCallback = (f, opts, done) => {
    const fastify = f.withTypeProvider<TypeBoxTypeProvider>()
    fastify.post('/login', {
        schema: {
            body: Type.Object({
                credential: Type.String(),
                password: Type.String()
            })
        }
    }, async (request, reply) => {
        if (request.session.student || request.session.admin) {
            fastify.log.info(`User ${request.body.credential} already logged in`)
            return reply.status(403).send({error: 'Already logged in'})
        }

        let db_student: User = await fastify.db.user_module.get_student_by_phone(request.body.credential)
        let db_admin;
        if (!db_student) {
            // maybe not a normal student, check if it's an admin
            db_admin = await fastify.db.user_module.get_admin_by_name(request.body.credential)
            if (!db_admin) {
                // not an admin either, return error
                fastify.log.info(`User not found: ${request.body.credential}`)
                return reply.status(404).send({error: 'User not found'})
            }
        }

        const db_bcrypt_password = db_student ? db_student.password : db_admin.password
        if (!await fastify.bcrypt_compare(request.body.password, db_bcrypt_password)) {
            fastify.log.info(`Incorrect password for user: ${request.body.credential}`)
            return reply.status(401).send({error: 'Incorrect password'})
        } else {
            fastify.log.info(`User ${request.body.credential} logged in`)
            request.session.student = db_student
            request.session.admin = db_admin
        }
        return {status: 'ok'}
    })

    fastify.post('/logout', async (request, reply) => {
        if (request.session.student) {
            fastify.log.info(`Student ${request.session.student} logged out`)
            delete request.session.student
        } else if (request.session.admin) {
            fastify.log.info(`Admin ${request.session.admin} logged out`)
            delete request.session.admin
        } else {
            fastify.log.info(`No user logged in`)
            return reply.status(403).send({error: 'No user logged in'})
        }
        return {status: 'ok'}
    })

    done()
}

export default login_api