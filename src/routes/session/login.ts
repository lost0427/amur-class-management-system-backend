import {FastifyPluginCallback} from "fastify";
import {compare, hash} from 'bcrypt'
import {Admin, Student, LoginUser, User} from "models/user";
import { Type } from '@sinclair/typebox'
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
        let login_user: User = await fastify.db.user_module.get_student_by_phone(request.body.credential)
        if (!login_user) {
            login_user = await fastify.db.user_module.get_admin_by_name(request.body.credential)
            if (!login_user) {
                return reply.status(404).send({error: 'User not found'})
            }

        }
        return {status: 'ok'}
    })

    done()
}

export default login_api