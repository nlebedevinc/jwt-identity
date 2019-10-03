import { Request, ResponseToolkit } from '@hapi/hapi';

export function get(request: Request, reply: ResponseToolkit) {
    console.log(request);
    return reply.response('response');
}
