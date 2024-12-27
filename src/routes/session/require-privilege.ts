import {preHandlerAsyncHookHandler} from "fastify/types/hooks";

export const require_login: preHandlerAsyncHookHandler = async (request, reply) => {
    if (!request.session || (!request.session.student && !request.session.admin)) {
        return reply.status(401).send({error: 'Unauthorized'});
    }
};

export const require_admin: preHandlerAsyncHookHandler = async (request, reply) => {
    if (!request.session || !request.session.admin) {
        return reply.status(403).send({error: 'Forbidden'});
    }
};
