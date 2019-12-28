import { Server as HapiServer, RequestApplicationState, ServerRegisterPluginObject } from '@hapi/hapi';
import testRoute from './api/test.api';
import usersRoute from './api/users.api';
import { Pool, PoolConfig } from 'pg';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as hapiSwagger from 'hapi-swagger';
import Database from './services/database';

interface ApplicationState extends RequestApplicationState {
    pool: Pool;
}
interface Server extends HapiServer {
    app: ApplicationState;
}

// pool config: should be replaced to connection string
const poolConfig: PoolConfig = {
    // connectionString: 'string',
    user: 'postgres',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
};

// initialize db connection
// const pool: Pool = new Pool(poolConfig);

async function init(): Promise<Server> {
    const server = new HapiServer({
        debug: false,
        port: 3000,
    }) as Server;

    const pool = Database.create(poolConfig);

    // meta
    server.app.pool = pool;

    // plugins: move to plugins directory
    await server.register([
        Inert,
        Vision,
        {
            plugin: hapiSwagger,
            options: {
                host: 'localhost:3000',
                info: {
                    title: 'Swagger Documentation',
                    description: 'Some desc',
                    version: '1.0',
                }
            }
        }
    ] as ServerRegisterPluginObject<object>[])

    // register server routes
    testRoute(server, '/v1');
    usersRoute(server, '/v1');

    // handle on close action
    server.events.on('stop', () => {
        Database.destroy(pool);
        console.log('Destroyed connection');
    });

    return server;
}

export default init;
