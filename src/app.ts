import { Server as HapiServer, RequestApplicationState } from '@hapi/hapi';
import testRoute from './api/test.api';
import { Pool, PoolConfig } from 'pg';

interface ApplicationState extends RequestApplicationState {
    pool: Pool;
}
interface Server extends HapiServer {
    app: ApplicationState;
}

// pool config: should be replaced to connection string
const poolConfig: PoolConfig = {
    // connectionString: 'string',
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
};

// initialize db connection
const pool: Pool = new Pool(poolConfig);

function init(): Server {
    const server = new HapiServer({
        debug: false,
        port: 3000,
    }) as Server;

    server.app.pool = pool;

    testRoute(server, '/v1');

    return server;
}

export default init;
