import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import { Pool } from 'pg';

/**
 * Simple function that demonstrates intsert request to psql
 * @param pool
 * @param name
 * @param password
 */
function storeCreds(pool: Pool, name: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO users (name, password) VALUES ($1, $2)', [name, password], (error: Error, result: any) => {
            if (error) {
                reject(error);
            }
    
            console.info(`Users creds where added with id: ${result}`);

            resolve(result);
        });
    })
}

export async function login(_: Request, h: ResponseToolkit): Promise<ResponseObject | Error> {
    // get payload information
    const { login, password } = _.payload as any;
    const { pool } = _.server.app as any;

    console.info(`Login: ${login}, Password: ${password}`);


    const result = await storeCreds(pool, login, password);

    console.info(result);

    // perform auth logic here
    return h.response(_.payload).code(200);
}
