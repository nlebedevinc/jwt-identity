import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import { Pool, QueryResult } from 'pg';
import { badImplementation, unauthorized, Boom } from '@hapi/boom';
import { sign } from 'jsonwebtoken';

// function generateToken(): string {
//     const token = sign({}, 'private key');

//     return token;
// }

// // works!
// function storeAlternative(pool: Pool, name: string, password: string): Promise<QueryResult> {
//     return new Promise((resolve, reject) => {
//         const query = 'INSERT INTO users (name, password) VALUES ($1, $2)';

//         pool.query(query, [name, password], (error: Error, result: QueryResult) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(result);
//             }
//         });
//     });
// }

/**
 * Simple function that demonstrates intsert request to psql
 * @param pool
 * @param name
 * @param password
 */
function storeCreds(pool: Pool, name: string, password: string): Promise<QueryResult> {
    const query = 'INSERT INTO sessions (name, password) VALUES ($1, $2)';
    return pool.query(query, [name, password]);
}

function findUserByLogin(pool: Pool, name: string): Promise<QueryResult> {
    const query = 'SELECT * from users WHERE name = $1';
    return pool.query(query, [name]);
}

function generateToken(user: any): string {
    const current = new Date();

    return sign({
        'iis': 'Identity service', // service name
        'iat': Math.floor(current.getTime() / 1000),
        'exp': Math.floor(current.getTime() / 1000),
        'aud': 'http://localhost:3000', // server url
        'sub': user.id,
    }, 'private_key');
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
export async function login(_: Request, h: ResponseToolkit): Promise<ResponseObject | Boom> {
    const { login, password } = _.payload as any;

    try {
        const { pool } = _.server.app as any;

        const user: any = await findUserByLogin(pool, login);

        if (!user) {
            return unauthorized('User does not exist');
        }

        if (!user.validatePassword(password)) {
            return unauthorized('Password is invalid');
        }

        const token = generateToken(user);

        await storeCreds(pool, login, password);

        return h.response(token).header('X-Access-Token', token).code(200);

    } catch (error) {
        console.error(error);
        return badImplementation(error.message, { error });
    }
}
