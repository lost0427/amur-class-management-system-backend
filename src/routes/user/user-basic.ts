import {FastifyPluginCallback} from "fastify";
import {TypeBoxTypeProvider} from "@fastify/type-provider-typebox";
import {require_login} from "../session/require-privilege";
import {Type} from '@sinclair/typebox'
import {Admin, Student} from "../../models/user";

const user_api: FastifyPluginCallback = (f, opts, done) => {
    const fastify = f.withTypeProvider<TypeBoxTypeProvider>()

    // 用户获取自身信息
    fastify.get('/self', {
        preHandler: require_login
    }, async (request, reply) => {
        return request.session.student || request.session.admin
    })

    // 用户登录状态下修改密码
    fastify.put('/password', {
        preHandler: require_login,
        schema: {
            body: Type.Object({
                old_password: Type.String(),
                new_password: Type.String()
            })
        }
    }, async (request, reply) => {
        const user = request.session.student || request.session.admin
        if (!await fastify.bcrypt_compare(request.body.old_password, user.password)) {
            return reply.status(401).send({error: 'Incorrect password'})
        }
        user.password = await fastify.bcrypt_hash(request.body.new_password)
        if (request.session.student) {
            await fastify.db.user_module.update_student(user as Student)
        } else if (request.session.admin) {
            await fastify.db.user_module.update_admin(user as Admin)
        }
        return {status: 'ok'}
    })

    done()
}

export default user_api