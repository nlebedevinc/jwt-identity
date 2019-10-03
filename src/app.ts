import { Server } from '@hapi/hapi';
import testRoute from './api/test.api';
// import { Pool, PoolClient, PoolConfig } from 'pg';

// // pool config
// const poolConfig: PoolConfig = {
//     user: 'me',
//     host: 'localhost',
//     database: 'api',
//     password: 'password',
//     port: 5432,
// };

// // initialize db connection
// const pool: PoolClient = new Pool(poolConfig);

function init(): Server {
    const server = new Server({
        debug: false,
        port: 3000,
    });

    testRoute(server, '/v1');

    return server;
}

export default init;
