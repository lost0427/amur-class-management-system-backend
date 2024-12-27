import {FastifyPluginCallback} from "fastify";
import {require_admin} from "../session/require-privilege";
import {Type} from "@sinclair/typebox";
import {TypeBoxTypeProvider} from "@fastify/type-provider-typebox";

const student_api: FastifyPluginCallback = (f, opts, done) => {
    const fastify = f.withTypeProvider<TypeBoxTypeProvider>()

    fastify.get('/student/:student_id', {
        preHandler: require_admin,
        schema: {
            params: Type.Object({
                student_id: Type.String()
            })
        }
    }, async (request, reply) => {
        fastify.log.info(`Getting student ${request.params.student_id}`)
        const student = await fastify.db.user_module.get_student_by_id(Number.parseInt(request.params.student_id))
        if (!student) {
            return reply.status(404).send({error: 'Student not found'})
        }
        return student
    })

    fastify.get('/student', {
        preHandler: require_admin
    }, async (request, reply) => {
        fastify.log.info('Getting all students')
        return await fastify.db.user_module.get_all_students()
    })

    fastify.post('/student', {
        preHandler: require_admin,
        schema: {
            body: Type.Object({
                name: Type.String(),
                phone: Type.String(),
                password: Type.String()
            })
        }
    }, async (request, reply) => {
        fastify.log.info(`Creating student ${request.body.name}`)
        return await fastify.db.user_module.create_student({
            name: request.body.name,
            phone_number: request.body.phone,
            password: request.body.password
        })
    })

    fastify.put('/student/:student_id', {
        preHandler: require_admin,
        schema: {
            params: Type.Object({
                student_id: Type.String()
            }),
            body: Type.Object({
                name: Type.String(),
                phone: Type.String(),
                password: Type.String()
            })
        }
    }, async (request, reply) => {
        fastify.log.info(`Updating student ${request.params.student_id} with ${JSON.stringify(request.body)}`)
        const student = await fastify.db.user_module.get_student_by_id(Number.parseInt(request.params.student_id))
        if (!student) {
            return reply.status(404).send({error: 'Student not found'})
        }
        student.name = request.body.name
        student.phone_number = request.body.phone
        student.password = request.body.password
        return await fastify.db.user_module.update_student(student)
    })

    fastify.delete('/student/:student_id', {
        preHandler: require_admin,
        schema: {
            params: Type.Object({
                student_id: Type.String()
            })
        }
    }, async (request, reply) => {
        fastify.log.info(`Deleting student ${request.params.student_id}`)
        return await fastify.db.user_module.delete_student(Number.parseInt(request.params.student_id))
    })

    done()
}

export default student_api