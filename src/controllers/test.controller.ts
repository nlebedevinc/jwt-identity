import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';

export function get(_: Request, h: ResponseToolkit): ResponseObject | Error {
    console.log(_);
    return h.response({ message: 'hello' });
}
