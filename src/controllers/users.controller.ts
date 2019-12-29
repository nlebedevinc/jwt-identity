import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import { Pool, QueryResult } from 'pg';
import { sign } from 'jsonwebtoken';

function generateToken(): string {
    const token = sign({}, 'private key');

    return token;
}

// works!
function storeAlternative(pool: Pool, name: string, password: string): Promise<QueryResult> {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (name, password) VALUES ($1, $2)';

        pool.query(query, [name, password], (error: Error, result: QueryResult) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * Simple function that demonstrates intsert request to psql
 * @param pool
 * @param name
 * @param password
 */
function storeCreds(pool: Pool, name: string, password: string): Promise<QueryResult> {
    const query = 'INSERT INTO users (name, password) VALUES ($1, $2)';
    return pool.query(query, [name, password]);
}

/**
 * Login controller functionality
 * GIVEN a password and login
 * THEN find a user in the database
 * IF user not found
 * THEN unauthorized
 * THEN validate password
 * THEN create a JWT token
 * THEN update session table
 * THEN return response to the client
 * @param _
 * @param h 
 */
export async function login(_: Request, h: ResponseToolkit): Promise<ResponseObject | Error> {
    // get payload information
    const { login, password } = _.payload as any;
    const { pool } = _.server.app as any;

    console.info(`Login: ${login}, Password: ${password}`);

    try {
        await storeCreds(pool, login, password);
    } catch (error) {
        console.error(error.message);
    }

    // console.info(result);

    // perform auth logic here
    return h.response(_.payload).code(200);
}
