import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';

export async function login(_: Request, h: ResponseToolkit): Promise<ResponseObject | Error> {
    // get payload information
    const { login, password } = _.payload as any;
    // const { pool } = _.server.app as any;

    console.info(`Login: ${login}, Password: ${password}`);

    // perform auth logic here
    return h.response(_.payload).code(200);
}
