import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';

export async function login(_: Request, h: ResponseToolkit): Promise<ResponseObject | Error> {
    // get payload information
    const { login, password } = _.payload as any;
    const { pool } = _.server.app as any;

    // perform auth logic here
}